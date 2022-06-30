'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customers.init({
    customerId: DataTypes.STRING,
    planName: DataTypes.STRING,
    priceId: DataTypes.STRING,
    subcriptionId: DataTypes.STRING,
    cancelAtPeriodEnd: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,    
    phone: DataTypes.STRING,
    currency: DataTypes.STRING,
    currentPeriodStart: DataTypes.DATE,
    currentPeriodEnd: DataTypes.DATE,
    defaultSource: DataTypes.STRING,
    subcriptionStatus: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customers',
  });
  return Customers;
};