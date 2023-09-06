const { DataTypes } = require("sequelize");
const sequelize = require("../../database/mysql/connect.js");
const Order = require("./Order.js");
const Product = require("./Product.js");

const OrderProduct = sequelize.define("order_products", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: "id"
        }
    },

    orderId: {
        type: DataTypes.INTEGER,
        references: {
            model: Order,
            key: "id"
        }
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    paranoid: true
})

module.exports = OrderProduct