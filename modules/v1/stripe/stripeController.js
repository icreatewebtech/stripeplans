const stripe = require('stripe')(process.env.SK_TEST);
const jwt = require('../../../helper/jwt');
const utils = require('../../../helper/utils');
const stripeServices = require('./stripeServices');
const stripeController = {};

/* Product List */
stripeController.productList = async (limit) => {
    const products = await stripe.products.list(limit);
    return products;
}
/* Default Price */
stripeController.productPrice = async (priceId) => {
    const price = await stripe.prices.retrieve(priceId);
    return price;
}

/*  create subscription */ 
stripeController.createSubscription = async (req,res) => {
    let subcription;
    let tocken = req.cookies.secretTocken;
    let stripeTocken = req.body.stripeToken; 

    if(tocken && stripeTocken) {
        tocken = jwt.verify(tocken);
        let user = await stripeServices.getUser({ where: { id: tocken.userId }});
        let data = user.dataValues;       
      try {             
            await stripe.customers.create({
                name: data.name,
                email: data.email,
                phone: data.phone,
                source: stripeTocken,
                address: {
                    city: data.city,
                    country: data.country,
                    state: data.state,
                }                
            }).then(async (stripeCustomer) => {
               subcription = await stripe.subscriptions.create({
                    customer: stripeCustomer.id,
                    items: [
                      {price: data.priceId},
                    ],
                    off_session: true
                  });
            }).then( async () => {                
               customer = await stripeServices.updateUser({
                    customerId: subcription.customer,
                    subcriptionId: subcription.id,
                    currentPeriodEnd: new Date(subcription.current_period_end * 1000),
                    currentPeriodStart: new Date(subcription.current_period_start * 1000),                                        
                    subcriptionStatus: subcription.status
                },{
                    where: {
                        id: data.id
                    }
                }); 
                console.log(subcription.latest_invoice);
                console.log('stripe customer and subscription successfully created.');
        });
        } catch (error) {
            console.log(error);
        } 
        res.clearCookie('mycustomer');
        tocken = jwt.createSecretTocken({ userId: data.id});        
        return res.redirect('/user/dashboard');
    } else {
        return res.render('web/default', { pageTitle: "Stripe subscriptions",status: false, message: 'Stripe subscriptions failed'});        
    }
};


/* Cancel subcription */
stripeController.cancelSubcription =  async (req,res) => { 
    let { customerId, renewStatus } = req.body;
    if (req.authUser.customerId === customerId) {
        let user = req.authUser;
        await stripe.subscriptions.update(
            user.subcriptionId,
            {
                cancel_at_period_end: renewStatus
            }
        ).then(async () => {
            await stripeServices.updateUser({
                cancelAtPeriodEnd: renewStatus
            },{
                where: {
                    customerId: user.customerId
                }
            }).catch((err) => {
                return res.render('user/default', { pageTitle: "Subscription cancel",status: false, message: 'Your subcription was not cancel', user: user});
            });
        }).catch((err) => {
            return res.render('user/default', { pageTitle: "Subscription cancel",status: false, message: 'Your stripe subcription was not cancel', user: user});
        }); 
        return res.redirect("/user/dashboard");
    } else {
        return res.render('web/default', { pageTitle: "Access denied",status: false, message: 'Unauthorized access'});        
    }
}

/* Change Plan */
stripeController.upgradePlan = async (req,res) => {
    if (req.authUser) {
        let user = req.authUser;
        let newPriceId = req.body.priceId;
        let productName = req.body.planName;
        const subscription = await stripe.subscriptions.retrieve(user.subcriptionId);
        await stripe.subscriptions.update(subscription.id, {
            cancel_at_period_end: false,
            off_session: true,
            proration_behavior: 'create_prorations',
            items: [{
              id: subscription.items.data[0].id,
              price: newPriceId,
            }]
        }).then( async (subcription) => {
            await stripeServices.updateUser({
                planName: productName,
                priceId: newPriceId,            
            },{
                where: {
                    customerId: user.customerId
                }
            }).catch((err) => {
                return res.render('user/default', { pageTitle: "Subscription Upgrade",status: false, message: 'Failed to change subscription.', user});
            });
            return res.redirect("/user/dashboard");
        }).catch((err) => {
            return res.render('user/default', { pageTitle: "Subscription Upgrade",status: false, message: 'Failed to change stripe subscription.', user});
        });        
    } else {
        return res.render('web/default', { pageTitle: "Access denied",status: false, message: 'Unauthorized access'});
    }
}

/* Cancel Subscription */
stripeController.deleteSubscription = async (req,res) => {
    if (req.authUser.customerId === req.body.customerId) {
        let user = req.authUser;
        await stripe.subscriptions.del(req.body.subcriptionId)
        .then( async () => {
            await stripeServices.updateUser({
                subcriptionStatus: 'cancelled'          
            },{
                where: {
                    customerId: req.body.customerId
                }
            })
            .catch((err) => {
                return res.render('user/default', { pageTitle: "Subscription Cancel",status: false, message: 'Failed to cancel subscription.', user});
            });
            return res.render('web/default', { pageTitle: "Subscription cancelled",status: true, message: 'Your subscription cancelled'});
        })
        .catch((err) => {
            console.log(err);
            return res.render('user/default', { pageTitle: "Subscription Cancel",status: false, message: 'Failed to cancel stripe subscription.', user});
        });        
    } else {
        return res.render('web/default', { pageTitle: "Access denied",status: false, message: 'Unauthorized access'});
    }
}

/* webhook  */
stripeController.webhook = async (req, res) => {    
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    try {
      event = await stripe.webhooks.constructEvent(
        req.body,
        req.headers["stripe-signature"],
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    const dataObject = event.data.object;    
    switch (event.type) {
        case "customer.updated": 
            console.log('customer.updated');        
            try {
                await stripeServices.updateUser({
                    currency: dataObject.currency,
                    defaultSource: dataObject.default_source,
                    invoicePrefix: dataObject.invoice_prefix,
                    defaultPaymentMethod: dataObject.invoice_settings.default_payment_method,
                    nextInvoiceSequence: dataObject.next_invoice_sequence
                },{
                    where: {
                        customerId: dataObject.id
                    }
                });   
            } catch (error) {
                console.log(error);   
            }            
            break;
        case "invoice.created": 
            console.log(`invoice.created`);            
            let invoiceExists = await stripeServices.findOneOrderByInvoice(dataObject.id);
            if (utils.empty(invoiceExists)) {
                try {
                    await stripeServices.createOrder({    
                        latestInvoice: dataObject.id,   
                        billingReason: dataObject.billing_reason,                        
                        currency: dataObject.currency,
                        customerId: dataObject.customer,
                        hostedInvoiceUrl: dataObject.hosted_invoice_url,
                        invoicePdf: dataObject.invoice_pdf,
                        status: dataObject.status,
                        subscriptionId: dataObject.subscription,
                    });
                    await stripeServices.updateUser({
                        latestInvoice: dataObject.id,
                    },{
                        where: {
                            customerId: dataObject.customer
                        }
                    });
                } catch (error) {
                    console.log(error);
                }   
            } else {
                try {
                    await stripeServices.updateOrder({
                        billingReason: dataObject.billing_reason,
                        currency: dataObject.currency,
                        customerId: dataObject.customer,
                        hostedInvoiceUrl: dataObject.hosted_invoice_url,
                        invoicePdf: dataObject.invoice_pdf,
                        status: dataObject.status,
                        subscriptionId: dataObject.subscription,
                    },
                    {
                        where: {
                            latestInvoice: dataObject.id
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            }            
            break;         
        case "charge.succeeded":
            console.log('charge.succeeded');
            console.log(dataObject);
            let chargeInvoiceExists = await stripeServices.findOneOrderByInvoice(dataObject.id);
            if (utils.empty(chargeInvoiceExists)) {
                try {
                    await stripeServices.createOrder({
                        chargeId: dataObject.id,
                        balanceTransactionId: dataObject.balance_transaction,                     
                        latestInvoice: dataObject.invoice,
                        paymentIntent: dataObject.payment_intent,                                              
                        paymentMethod: dataObject.payment_method,                          
                    });
                } catch (error) {
                    console.log(error);
                }   
            } else {
                try {
                    await stripeServices.updateOrder({
                        chargeId: dataObject.id,
                        balanceTransactionId: dataObject.balance_transaction,
                        paymentIntent: dataObject.payment_intent,                                              
                        paymentMethod: dataObject.payment_method,
                    },{
                        where: {
                            latestInvoice: dataObject.invoice,
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            }            
            break;
        case "invoiceitem.created": 
            console.log("invoiceitem.created");
            console.log(dataObject);
            break;
        case "customer.subscription.deleted": 
            console.log("customer.subscription.deleted");
            try {
                await stripeServices.updateUser({
                    status: 'deactive'
                },{
                    where: {
                        customerId: dataObject.customer
                    }
                });
                console.log(`${dataObject.customer} : subcription canceled.'`);
            } catch (error) {   
                console.log(error);
            }
    }
    res.sendStatus(200);
};

module.exports = stripeController;