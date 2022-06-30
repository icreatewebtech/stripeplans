const jwt = require('../../../helper/jwt');
const mail = require('../../../helper/mail');
const db = require('../../../models');
const webServices = require('./webServices');
const Customers = db.Customers;

/* subscription plan views */
const subriptionPlans  = async (req,res) => {
    let priceList = [];
    let product = await webServices.productList({limit: 3}); 
    for(let i = 0 ; i < product.data.length; i++) {
        let list = await webServices.productPrice(product.data[i].default_price);
        priceList.push(list);
    }    
    res.render('./web/subcription-palns',{pageTitle: 'Subscription plans', plan: product.data, price: priceList});
}

/* subcription form views */
const subcriptionForm = (req, res) => {
    let data = {
        name: req.params.productName,
        productId: req.params.productId,
        priceId: req.params.priceId,
    };
    res.render('./web/subcriptionForm',{pageTitle:data.name, data});
}

/* add user to database */
const addCustomers = async (req,res) => {
    let emailToken = await jwt.createSecretTocken({email: req.body.email});
    let data = {} = req.body;
    var mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "Email Verificaction",
        html: "<a href='"+ process.env.ROOT_URL +"/verifyEmail/"+ emailToken +"'>Click here to verify</a>"
    }; 
    mail.sendEmail(mailOptions).then(async (info) => {
        try {
            let result = await Customers.create(data);
            console.log(`New customers added to database. CustomerId : ${result.dataValues.id}`);   
            return res.render('web/default', { pageTitle: "Email verification",status: true, message: 'Email verification has been sent. Please verify your email'});
        } catch (err) {
            return res.render('web/default', { pageTitle: "Subscription",status: false, message: 'Subscription failed'});
        }         
    }).catch( (err) => {
        return res.render('web/default', { pageTitle: "Email verification",status: false, message: 'Failed to send verification email'});
    });
    
}

/* verify email */
const verifyEmail = async (req,res) => {
    let emailTocken = req.params.emailTocken;
    emailTocken = await jwt.verify(emailTocken);
    if (emailTocken.email) {
        let user = await webServices.findOneCustomerByEmail(emailTocken.email);
        if (user) {            
            if (user.dataValues.status === "verification_pending") {
                try {
                    await webServices.updateUser({ status: "verified"},{ where: { email: emailTocken.email}});                    
                    return res.render('web/createPassword',{ pageTitle: "Create password" , user: user.dataValues.id});
                } catch (error) {                    
                    return res.render('web/default', { pageTitle: "Email verification",status: false, message: 'Email verified but unable to update status'});
                }   
            } else if(user.dataValues.status === "verified") {                
                return res.render('web/createPassword',{ pageTitle: "Create new password" , user: user.dataValues.id});                
            } else if(user.dataValues.status === "active"){                 
                return res.redirect("/login");
            } else {
                return res.render('web/default', { pageTitle: "Subscription",status: false, message: 'Your account is deactivated'});                
            }
        } else {
            return res.render('web/default', { pageTitle: "Email verification",status: false, message: "You don't have an account."});        
        }        
        
    } else {
        return res.render('web/default', { pageTitle: "Access denied",status: false, message: 'Your link was expire or brocken.'});        
    }
}
module.exports = {
    addCustomers,
    subriptionPlans,
    subcriptionForm,
    verifyEmail
}
