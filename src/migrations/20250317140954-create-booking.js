'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Booking', {
      bookingId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'userId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      matchId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Match',
          key: 'matchId',
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
      },
      bookedTkts: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      bookedDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
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
        allowNull: false,
        references: {
          model: 'User',
          key: 'userId',
        }
      },
      updatedUserId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'User',
          key: 'userId',
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Booking');
  }
};
