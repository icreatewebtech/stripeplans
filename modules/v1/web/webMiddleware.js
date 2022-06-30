const webServices = require('./webServices');
const utils = require('../../../helper/utils');
const jwt = require('../../../helper/jwt');
const webMiddleware = {};

/* find if user exists */
webMiddleware.emailExists = async (req,res,next) => {
    let email = req.body.email;
    if (!utils.empty(email)) {
        const user = await webServices.findOneCustomerByEmail(email);
        if (!utils.empty(user)) {
            let tocken = jwt.createSecretTocken({userId: user.dataValues.id});
            res.cookie('mycustomer', tocken);
            if (user.dataValues.status === "verified") {
                /* if verified user then create password */
                return res.render('web/createPassword',{ pageTitle: "Create password" , user: user.dataValues.id});
            } else if (user.dataValues.status === "active") {
                /* if user active */
                return res.render('web/default', { pageTitle: "Email verification",status: true, message: 'An account is already registered… Please login'});
            } else if(user.dataValues.status === "deactive") {
                /* if user deactivated */
                return res.render('web/default', { pageTitle: "Email verification",status: false, message: 'Your account was deactivated.'});
            } else {
                /* if user verification pending */
                return res.render('web/default', { pageTitle: "Email verification",status: false, message:'Email verification pending. Please virify your email'});
            }
        }
        next();
    } else {
        next();
    }
}

module.exports = webMiddleware;
