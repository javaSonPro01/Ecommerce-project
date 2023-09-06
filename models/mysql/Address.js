const { DataTypes } = require("sequelize");
const sequelize = require("../../database/mysql/connect.js");
const User = require("./User.js");

const Address = sequelize.define("Address", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    city: {
        type: DataTypes.STRING,
        allowNull: true,
        default: null
    },

    province: {
        type: DataTypes.STRING,
        allowNull: true,
        default: null

    },

    address: {
        type: DataTypes.STRING,
        allowNull: true,
        default: null

    },

    zip: {
        type: DataTypes.STRING,
        allowNull: true,
        default: null

    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    }
})

module.exports = Address