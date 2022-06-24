'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.STRING
      },
      planName: {
        type: Sequelize.STRING
      },
      priceId: {
        type: Sequelize.STRING
      },
      subcriptionId: {
        type: Sequelize.STRING
      },
      cancelAtPeriodEnd: {
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      postalCode: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      currentPeriodStart: {
        type: Sequelize.DATE
      },
      currentPeriodEnd: {
        type: Sequelize.DATE
      },
      defaultSource: {
        type: Sequelize.STRING
      },
      invoicePrefix: {
        type: Sequelize.STRING
      },
      defaultPaymentMethod: {
        type: Sequelize.STRING
      },
      nextInvoiceSequence: {
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
    await queryInterface.dropTable('Customers');
  }
};