const userService = require('./userService');
const utils = require('../../../helper/utils');
userMiddleware = {};

userMiddleware.emailDoesNotExists = async (req,res,next) => {
    let { email } = req.body;
    let user;
    user = await userService.findOneUserByEmail(email);
    if(utils.empty(user)){
        return res.status(400).json({errors: "User Not Found"});
    } else {
        req.user = user;
        next();
    }
}

module.exports = userMiddleware;