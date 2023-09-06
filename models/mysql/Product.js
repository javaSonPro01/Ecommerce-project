const { DataTypes } = require("sequelize");
const sequelize = require("../../database/mysql/connect.js");
const Category = require("./Category.js");
const User = require("./User.js");

const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    photo: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    price: {
        type: DataTypes.STRING,
        allowNull: false,
    },


    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Category,
            key: "id"
        }
    },
})

module.exports = Product