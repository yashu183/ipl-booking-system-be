'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Match', {
      matchId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      homeTeamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Team',
          key: 'teamId'
        }
      },
      awayTeamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Team',
          key: 'teamId'
        }
      },
      venue: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      scheduledDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      ttlTkts: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ttlBookedTkts: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
          key: 'userId'
        }
      },
      updatedUserId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'User',
          key: 'userId'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Match');
  }
};
