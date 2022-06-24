const db = require('../../../models');
const Customer = db.Customers;
const webServices = {};

webServices.findOneCustomerByEmail = (email) => {
    let query = {
        where: {
            email: email
        }
    }
    let data = Customer.findOne(query);
    return data;
};

module.exports = webServices;

