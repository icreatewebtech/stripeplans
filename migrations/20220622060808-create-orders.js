'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.STRING
      },
      subscriptionId: {
        type: Sequelize.STRING
      },
      latestInvoice: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      billingReason: {
        type: Sequelize.STRING
      },
      chargeId: {
        type: Sequelize.STRING
      },
      hostedInvoiceUrl: {
        type: Sequelize.STRING
      },
      invoicePdf: {
        type: Sequelize.STRING
      },
      paymentIntent: {
        type: Sequelize.STRING
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      balanceTransactionId: {
        type: Sequelize.STRING
      },
      clientSecret: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};