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
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'false'
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
      subcriptionStatus: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "pending",
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "verification_pending",
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