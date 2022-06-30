const utils = require('./utils');
const jwt = require('./jwt');
const userService = require('../modules/v1/user/userService');

const auth = {};

auth.isAuthenticateUser = async (req,res,next) => {
    let tocken = req.cookies.secretTocken;
    const userData = jwt.verify(tocken);
    if (utils.empty(userData.userId)) {
       return res.status(401).json('unauthorized acces');
    }
    const where = {
        id: userData.userId,        
    };
    userService.getUser({where}).then((user) => {
        if (user) {     
            if (user.status === 'active') {
                let data = user.toJSON();                       
                req.authUser = data;
                return next();   
            } else {
                return res.render("web/default",{pageTitle: "Subscription Canceled" ,status: false, message: "your subcription was ended."});
            }
        }
        return res.status(403).json({status: false, message: 'forbidden access'});
    });
}

module.exports = auth;