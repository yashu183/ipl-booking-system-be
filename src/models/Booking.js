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
        allowNull: false
      },
      matchId: {
        type: DataTypes.INTEGER,
        allowNull: false
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
        allowNull: false
      },
      updatedUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
      }
    }, 
    {
      tableName: 'Booking',
      underscored: true
    });
  
    // Associations
    Booking.associate = function(models) {
      Booking.belongsTo(models.User, { foreignKey: 'userId' });
      Booking.belongsTo(models.Match, { foreignKey: 'matchId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
      Booking.belongsTo(models.User, { foreignKey: 'createdUserId' });
      Booking.belongsTo(models.User, { foreignKey: 'updatedUserId' });
    };
  
    return Booking;
};
  