const db = require('../../../models');
const { productList, productPrice } = require('../stripe/stripeController');
const Customer = db.Customers;
const webServices = {};
/* find by email */
webServices.findOneCustomerByEmail = (email) => {
    let query = {
        where: {
            email: email
        }
    }
    let data = Customer.findOne(query);
    return data;
};
/* update */
webServices.updateUser = (data,where) => {
    return Customer.update(data,where);
}
/* stripe plan list */
webServices.productList = async () => {
    return await productList();
}
/* stripe plan default price */
webServices.productPrice = async (priceId) => {
    return await productPrice(priceId);
}
module.exports = webServices;

