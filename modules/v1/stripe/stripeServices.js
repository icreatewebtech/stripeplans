const db = require('../../../models');

const customerModel = db.Customers;
const orderModel = db.orders;
const stripeServices = {};

/* find user by email */
stripeServices.findOneUserByEmail = (email) => {
    let query = {
        where: {
            email: email
        }
    }
    return customerModel.findOne(query);
}  

/* find one user */
stripeServices.getUser = (where) => {
    return customerModel.findOne(where);
}

/* update user */
stripeServices.updateUser = (data,where) => {
    return customerModel.update(data,where);
}

/* Order  */
stripeServices.createOrder = (data) => {
    return orderModel.create(data);
}

/* update order */
stripeServices.updateOrder = (data,where) => {
    return orderModel.update(data,where);
}

/* find order by invoice */
stripeServices.findOneOrderByInvoice = (invoice) => {
    let query = {
        where: {
            latestInvoice: invoice
        }
    };
    return orderModel.findOne(query);
}

module.exports = stripeServices;