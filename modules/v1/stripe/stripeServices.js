const db = require('../../../models');

const customerModel = db.Customers;
const orderModel = db.orders;
const stripeServices = {};

stripeServices.findOneUserByEmail = (email) => {
    let query = {
        where: {
            email: email
        }
    }
    return customerModel.findOne(query);
}  

stripeServices.getUser = (where) => {
    return customerModel.findOne(where);
}

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