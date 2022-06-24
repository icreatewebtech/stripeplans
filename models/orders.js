'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orders.init({
    customerId: DataTypes.STRING,
    subscriptionId: DataTypes.STRING,
    latestInvoice: DataTypes.STRING,
    currency: DataTypes.STRING,
    billingReason: DataTypes.STRING,
    chargeId: DataTypes.STRING,
    hostedInvoiceUrl: DataTypes.STRING,
    invoicePdf: DataTypes.STRING,
    paymentIntent: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    balanceTransactionId: DataTypes.STRING,
    clientSecret: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'orders',
  });
  return orders;
};