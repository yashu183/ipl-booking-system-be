const Sequelize = require('sequelize');
const sequelize = require("../configs/database");

// Import models
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Booking = require('./Booking')(sequelize, Sequelize.DataTypes);
const Match = require('./Match')(sequelize, Sequelize.DataTypes);
const Team = require('./Team')(sequelize, Sequelize.DataTypes);

Booking.belongsTo(Match, { foreignKey: 'matchId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

// In Match model
Match.hasMany(Booking, { foreignKey: 'matchId' });
Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });

Team.hasMany(Match, { foreignKey: "homeTeamId", as: "homeMatches" });
Team.hasMany(Match, { foreignKey: "awayTeamId", as: "awayMatches" });

// Export models
module.exports = {
  User,
  Booking,
  Match,
  Team
};
