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
        tableName: 'Team'
    });

    return Team;
};
