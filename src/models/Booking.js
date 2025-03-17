module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
      bookingId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,    
        references: {
          model: "User",
          key: "userId",
        }
      },
      matchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Match",
          key: "matchId"
        }
      },
      bookedTkts: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      bookedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
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
      tableName: 'Booking'
    });
  
    return Booking;
};
  