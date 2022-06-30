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
        return res.render('web/default', { pageTitle: "Login",status: false, message: 'Email and password mistmatch.'});        
    } catch (error) {        
        return res.render('web/default', { pageTitle: "Login",status: false, message: 'Email and password mistmatch.'});        
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
    if (req.authUser) {
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
        return res.render('user/dashboard',{pageTitle: 'Dashboard', user, orders: order});
    } else {
        return res.render('web/default', { pageTitle: "Access denied",status: false, message: 'Forbidden access is denied'});
    }
}

/* Logout  */
userController.logout = (req,res) => {
    res.clearCookie('secretTocken');
    return res.redirect('/login');
}

/* create new password */
userController.createPassword = async (req,res) => {

    let hashPassword = utils.hash(req.body.password);
    try {
        let user = await userService.updateUser({password: hashPassword, status: "active"},{ where : {
            id: req.body.user_id
        }});
        console.log('password created successfull');
        return res.redirect('/login');
    } catch (error) {
        console.log(error);
    }
    return res.render('web/default', { pageTitle: "Access denied",status: false, message: 'Forbidden access is denied'});    
}

/* Update password */
userController.updatePassword = async (req,res) => {
    if (req.body.user_id) {
        let user = await userService.getUser({ where: { id: req.body.user_id }});  
        let camparePassword = utils.compare(req.body.currentPassword, user.password);
        if (camparePassword) {
            let hashPassword = utils.hash(req.body.newPassword);
            try {
                await userService.updateUser({
                        password: hashPassword
                    },{ 
                        where : {
                            id: req.body.user_id
                        }
                });
                console.log('password update successfull');
                return res.redirect('/user/dashboard');
            } catch (error) {
                return res.render('user/default', { pageTitle: "Password change",status: false, message: 'Password update failed.', user: user.dataValues});
            }
        } else {
            return res.render('user/default', { pageTitle: "Password change",status: false, message: 'Password does not match.', user: user.dataValues});
        }
    }        
    return res.render('web/default', { pageTitle: "Access denied",status: false, message: 'Forbidden access is denied'});
}

/* checkout view */
userController.checkout = (req,res) => {
    return  res.render('user/checkout',{pageTitle:'Checkout', user: req.authUser});
};

/* change plan view */
userController.changePlan = async (req,res) => {
    let priceList = [];
    let product = await userService.productList({limit: 3}); 
    for(let i = 0 ; i < product.data.length; i++) {
        let list = await userService.productPrice(product.data[i].default_price);
        priceList.push(list);
    }   
    let user = req.authUser;
    console.log(user);
    let order = await userService.getOrderWithColumn({
        attributes: ['id','createdAt','currency','billingReason','balanceTransactionId','invoicePdf','status'],
        where: {
            customerId: user.customerId
        },
        order: [
            ['id', 'DESC']
        ]
    }); 
    res.render('user/changePlan',{pageTitle: 'Change Plan', plan: product.data, price: priceList, user, orders: order});
}

module.exports = userController;