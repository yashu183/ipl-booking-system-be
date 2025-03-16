module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('Team', {
        teamId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        logo: {
            type: DataTypes.TEXT,
            allowNull: true
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
        },
        updatedUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        }
    }, 
    {
        tableName: 'Team',
        underscored: true
    });

    // Associations
    Team.associate = function (models) {
        Team.belongsTo(models.User, { foreignKey: 'createdUserId' });
        Team.belongsTo(models.User, { foreignKey: 'updatedUserId' });
    };

    return Team;
};
