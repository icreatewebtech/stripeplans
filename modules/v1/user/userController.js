const utils = require('../../../helper/utils');
const jwt = require('../../../helper/jwt');
const userService = require('./userService');
userController = {};

userController.login = async (req,res) => {
    let responseData = {};
    try {
       const {body: {password}, user} = req;
       if(!utils.empty(user) && password && userService.authenticate(password,user.password)){
            responseData = await userController.doLogin(user,req,res); 
            let tocken = responseData.secretTocken;
            res.cookie('secretTocken',tocken);
            return res.redirect('/user/dashboard');
        }
        res.status(200).json('Email and password mistmatch.');
    } catch (error) {        
        console.log(error);
        res.status(200).json({error});
    }
}

userController.doLogin = (user) => {
    try {
        let responseData = {};
        user = user.toJSON();
        delete user.password;
        user.secretTocken = jwt.createSecretTocken({
            userId: user.id
        });
        responseData = user;
        return responseData;
    } catch (error) {
        throw error;
    }
}

userController.dashboard = async (req,res) => {
    let user = req.authUser;
    let order = await userService.getOrderWithColumn({
        attributes: ['id','createdAt','currency','billingReason','balanceTransactionId','invoicePdf','status'],
        where: {
            customerId: user.customerId
        },
        order: [
            ['id', 'DESC']            
        ]
    });
    res.render('user/dashboard',{pageTitle: 'Dashboard', user, orders: order});
}

/* Logout  */
userController.logout = (req,res) => {
    res.clearCookie('secretTocken');
    return res.redirect('/login');
}

/* Update password */
userController.updatePassword = async (req,res) => {
    let hashPassword = utils.hash(req.body.password);
    try {
        let user = await userService.updateUser({password: hashPassword},{ where : {
            id: req.body.user_id
        }});
        console.log('password update successfull');
        return res.redirect('/user/dashboard');
    } catch (error) {
        console.log(error);
    }
    res.status(403).json({status: "fail", message: "forbidden access"});
}

module.exports = userController;