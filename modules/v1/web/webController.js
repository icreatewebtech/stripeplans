const stripeController = require('../stripe/stripeController');
const jwt = require('../../../helper/jwt');

const db = require('../../../models');
const Customers = db.Customers;

/* subcription plan views */
const subriptionPlans  = async (req,res) => {
    const product = await stripeController.productList({ limit: 3});
    res.render('./web/subcription-palns',{pageTitle: 'Subcription plans', plan: product.data});
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
    let data = {} = req.body;
    try {
        let result = await Customers.create(data);
        let tocken = await jwt.createSecretTocken({userId:result.dataValues.id});
        res.cookie('mycustomer',tocken);
        console.log(`New customers added to database. CustomerId : ${result.dataValues.id}`);        
        return res.redirect('/checkout');
    } catch (err) {
        console.log(err);
    } 
}


module.exports = {
    addCustomers,
    subriptionPlans,
    subcriptionForm
}
