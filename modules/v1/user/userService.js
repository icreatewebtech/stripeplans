const utils = require('../../../helper/utils');
const db = require('../../../models');
const { productList, productPrice } = require('../stripe/stripeController');
const customerModel = db.Customers;
const orderModel = db.orders;

const userService = {};

userService.findOneUserByEmail = (email) => {
    let query = {
        where: {
            email: email
        }
    }
    return customerModel.findOne(query);
}   

userService.getUser = (where) => {
    return customerModel.findOne(where);
}

userService.authenticate = (password, hashPassword) => {
    return utils.compare(password,hashPassword);
}

userService.updateUser = (data,where) => {
    return customerModel.update(data,where);
}
/* --------------------------  ORDER MODEL ------------------------------------ */
userService.getUserOrder = (where) => {
    return orderModel.findOne(where);
}

/* all data with specifie column name */
userService.getOrderWithColumn = (attributes) => {
    return orderModel.findAll(attributes);
}

/* stripe */
userService.productList = async () => {
    return await productList();
}

userService.productPrice = async (priceId) => {
    return await productPrice(priceId);
}
module.exports = userService;