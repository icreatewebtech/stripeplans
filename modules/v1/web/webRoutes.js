const express = require('express');
const webController = require('./webController');
const webValidator = require('./webValidator');
const webMiddleware = require('./webMiddleware');
const {validationHandler} = require('../../../helper/validate');

const webRoutes = express.Router();

webRoutes.get('/login',(req,res) => {   
    res.render('web/login',{pageTitle: 'Login'});
});

/* subcriptions plan */
const subcriptinPlanMiddleware = [
    webController.subriptionPlans,
];
webRoutes.get('/',subcriptinPlanMiddleware);

/* subcriptionForm  */
const subcriptionFormMiddleware = [
    webController.subcriptionForm,
];
webRoutes.get('/subcriptionForm/:productName/:productId/:priceId', subcriptionFormMiddleware);


/* ADD CUSTOMERS to database*/
const addCustomerMiddleware = [
    webValidator.validateFormData(),
    validationHandler,
    webMiddleware.emailExists,
   webController.addCustomers,
];
webRoutes.post('/subcription', addCustomerMiddleware
);

/* checkout and generation tocken */
webRoutes.get('/checkout',(req,res) => {
    if(req.cookies.mycustomer) {
      return  res.render('web/checkout',{pageTitle:'Checkout'});
    } 
    res.status(403).json({ status: 'fail', message: 'Forbidden access'});
}); 

/* send a STRIPE_PUBLISHABLE_KEY key in the custom.js file */
webRoutes.get("/config", async (req, res) => {    
    res.send({
      publishableKey: process.env.PK_TEST
    });
  });

module.exports = webRoutes;