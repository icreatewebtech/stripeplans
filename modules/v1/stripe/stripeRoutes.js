const express = require('express');
const bodyParser = require('body-parser');
const stripeRoutes = express.Router();
const stripeController = require('./stripeController');
const auth = require('../../../helper/auth');
const stripeServices = require('./stripeServices');

/* Checkout and Subscribe */
const subscribeMiddleware = [
    stripeController.createSubscription,
];
stripeRoutes.post('/subscribe', subscribeMiddleware);

/* Upgrade plan */
const upgradePlanMiddleware = [
    auth.isAuthenticateUser,
    stripeController.upgradePlan
];
stripeRoutes.post('/upgradePlan',upgradePlanMiddleware);

/* Cancel subcription */
const cancelSubcriptionMiddleware = [
    auth.isAuthenticateUser,
    stripeController.cancelSubcription,
];
stripeRoutes.post('/cancelSubcription',cancelSubcriptionMiddleware);

/* webhook */
const webhookMiddleware = [
    stripeController.webhook
];
stripeRoutes.post('/webhook', webhookMiddleware);
module.exports = stripeRoutes;