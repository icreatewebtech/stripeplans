const webServices = require('./webServices');
const utils = require('../../../helper/utils');
const jwt = require('../../../helper/jwt');
const webMiddleware = {};

webMiddleware.emailExists = async (req,res,next) => {
    let email = req.body.email;
    if (!utils.empty(email)) {
        const user = await webServices.findOneCustomerByEmail(email);
        if (!utils.empty(user)) {            
            console.log('user exist and redirect to checkout');
            let tocken = jwt.createSecretTocken({userId: user.dataValues.id});        
            res.cookie('mycustomer', tocken);            
            return res.redirect('/checkout');
        }
        next();
    } else {
        next(); 
    }
}

module.exports = webMiddleware;
