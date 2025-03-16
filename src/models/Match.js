const { DatabaseConstants } = require("../constants/DatabaseConstants");

module.exports = (sequelize, DataTypes) => {
    const Match = sequelize.define('Match', {
      matchId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      homeTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      venue: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      scheduledDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      ttlTkts: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ttlBookedTkts: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isUpdated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      },
      createdUserId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      updatedUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
      }
    }, 
    {
      tableName: 'Match',
      underscored: true,
      validate: {
        ttlBookedTktsLimit() {
          if (this.ttlBookedTkts > this.ttlTkts) {
            throw new Error(DatabaseConstants.ValidationErrors.InvalidBookedTickets);
          }
        }
      }
    });
  
    // Associations
    Match.associate = function(models) {
      Match.belongsTo(models.Team, { foreignKey: 'homeTeamId' });
      Match.belongsTo(models.Team, { foreignKey: 'awayTeamId' });
      Match.belongsTo(models.User, { foreignKey: 'createdUserId' });
      Match.belongsTo(models.User, { foreignKey: 'updatedUserId' });
    };
  
    return Match;
};
  