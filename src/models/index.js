const Sequelize = require('sequelize');
const sequelize = require("../configs/database");
const { DatabaseConstants } = require('../constants/DatabaseConstants');

// Import models
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Booking = require('./Booking')(sequelize, Sequelize.DataTypes);
const Match = require('./Match')(sequelize, Sequelize.DataTypes);
const Team = require('./Team')(sequelize, Sequelize.DataTypes);

// Establish associations
User.associate({ Booking, Team, Match });
Booking.associate({ User, Match });
Match.associate({ Booking, User, Team });
Team.associate({ Match, User });

// Sync models, if there are any updates
sequelize.sync({ alter: true, force: false })
  .then(() => console.log(DatabaseConstants.SyncSuccessful))
  .catch(err => console.error(DatabaseConstants.SyncFailed, err));

// Export models
module.exports = {
  User,
  Booking,
  Match,
  Team
};
