'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM("USER", "ADMIN"),
        allowNull: false,
        defaultValue: "USER"
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isUpdated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      createdUserId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      updatedUserId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User');
  }
};
