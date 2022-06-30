const express = require('express');
const userRoute = express.Router();
const userValidator = require('./userValidator');
const userController = require('./userController');
const userMiddleware = require('./userMiddleware');
const auth = require('../../../helper/auth');
const {validationHandler} = require('../../../helper/validate');

/* login */
const loginMiddleware = [
    userValidator.validateUser(),
    validationHandler,
    userMiddleware.emailDoesNotExists,
    userController.login
];
userRoute.post('/login', loginMiddleware);

/* logout */
const logoutMiddleware = [
    userController.logout
];
userRoute.get('/logout',logoutMiddleware);

/* dashboard */
const dashboardMiddleware = [
    auth.isAuthenticateUser,
    userMiddleware.hasSubscription,
    userController.dashboard
];
userRoute.get('/dashboard',dashboardMiddleware);

/* Create password */
const createPasswordMiddleware = [
    userValidator.matchPassword(),
    validationHandler,
    userController.createPassword,
];
userRoute.post('/createPassword',createPasswordMiddleware);

/* Update password */
const updatePasswordMiddleware = [
    auth.isAuthenticateUser,
    userValidator.matchUpdatePassword(),
    validationHandler,
    userController.updatePassword,
];
userRoute.post('/updatePassword',updatePasswordMiddleware);

/* checkout and generation tocken */
const checkoutMiddleware = [
    auth.isAuthenticateUser,
    userController.checkout
];
userRoute.get('/checkout', checkoutMiddleware);

/* change plan */
const changePlanMiddleware = [
    auth.isAuthenticateUser,
    userController.changePlan
];
userRoute.get('/changePlan',changePlanMiddleware);
module.exports = userRoute;


