'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Team', 'logo', {
      type: Sequelize.TEXT('long'),
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Team', 'logo', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  }
};
