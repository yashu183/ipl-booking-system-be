const Sequelize = require('sequelize');
const sequelize = require("../configs/database");
const { DatabaseConstants } = require('../constants/DatabaseConstants');

// Import models
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Booking = require('./Booking')(sequelize, Sequelize.DataTypes);
const Match = require('./Match')(sequelize, Sequelize.DataTypes);
const Team = require('./Team')(sequelize, Sequelize.DataTypes);

// Export models
module.exports = {
  User,
  Booking,
  Match,
  Team
};
