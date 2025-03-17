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
        allowNull: false,
        references: {
          model: "Team",
          key: "teamId",
        }
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Team",
          key: "teamId",
        }
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
        allowNull: false,
        references: {
          model: "User",
          key: "userId",
        }
      },
      updatedUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: "User",
          key: "userId",
        }
      }
    }, 
    {
      tableName: 'Match',
      validate: {
        ttlBookedTktsLimit() {
          if (this.ttlBookedTkts > this.ttlTkts) {
            throw new Error(DatabaseConstants.ValidationErrors.InvalidBookedTickets);
          }
        }
      }
    });
  
    return Match;
};
  