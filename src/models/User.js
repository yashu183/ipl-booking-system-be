module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM("USER", "ADMIN"),
        allowNull: false,
        defaultValue: "USER"
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
        allowNull: true
      },
      updatedUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
      }
    }, 
    {
      tableName: 'User',
      underscored: true
    });
  
    // Associations
    User.associate = function(models) {
      User.hasMany(models.Team, { foreignKey: 'createdUserId' });
      User.hasMany(models.Team, { foreignKey: 'updatedUserId' });
      User.hasMany(models.Match, { foreignKey: 'createdUserId' });
      User.hasMany(models.Match, { foreignKey: 'updatedUserId' });
    };
  
    return User;
};
  