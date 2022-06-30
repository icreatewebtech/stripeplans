const userService = require('./userService');
const utils = require('../../../helper/utils');
userMiddleware = {};

userMiddleware.emailDoesNotExists = async (req,res,next) => {
    let { email } = req.body;
    let user;
    user = await userService.findOneUserByEmail(email);
    if(utils.empty(user)){
        return res.render('web/default', { pageTitle: "Login",status: false, message: "You don't have an account."});
    } else {
        req.user = user;
        next();
    }
}

userMiddleware.hasSubscription = async (req,res,next) => {
    let user = req.authUser; 
    if( user.subcriptionStatus === "active") {
        next();
    } else if(user.subcriptionStatus === "pending") {
        return res.redirect('/user/checkout');
    } else {
        return res.render('user/default', { pageTitle: "Status",status: false, message: "Your subscription "+ user.subcriptionStatus +" ", user});
    }
}

module.exports = userMiddleware;