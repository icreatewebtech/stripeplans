const express = require('express');
const webController = require('./webController');
const webValidator = require('./webValidator');
const webMiddleware = require('./webMiddleware');
const {validationHandler} = require('../../../helper/validate');
const stripeController = require('../stripe/stripeController');

const webRoutes = express.Router();
/* login view */
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
    webController.addCustomers
];
webRoutes.post('/subcription', addCustomerMiddleware
);

/* verify email */
const emailVerificationMiddleware = [
    webController.verifyEmail
];
webRoutes.get('/verifyEmail/:emailTocken', emailVerificationMiddleware);

/* send a STRIPE_PUBLISHABLE_KEY key in the custom.js file */
webRoutes.get("/config", async (req, res) => {
    res.send({
      publishableKey: process.env.PK_TEST
    });
});

module.exports = webRoutes;