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
    userController.dashboard
];
userRoute.get('/dashboard',dashboardMiddleware);

/* Create or Update password */
const passwordMiddleware = [
    auth.isAuthenticateUser,
    userValidator.matchPassword(),
    validationHandler,
    userController.updatePassword,
];
userRoute.post('/createPassword',passwordMiddleware);

module.exports = userRoute;

