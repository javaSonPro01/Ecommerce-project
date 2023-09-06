const { DataTypes } = require("sequelize");
const sequelize = require("../../database/mysql/connect.js");
const Role = require("./Role.js");


const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,

    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    role: {
        defaultValue: "customer",
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Role,
            key: "slug"
        }
    }
});

module.exports = User
