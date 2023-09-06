const { DataTypes } = require("sequelize");
const sequelize = require("../../database/mysql/connect.js");
const User = require("./User.js");
const Coupon = require("./Coupon.js");

// status: pending,approved, delevery, done, rejected
const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
        allowNull: false
    },
    received_at: {
        type: DataTypes.DATE,
        allowNull: true

    },
    cancelled_at: {
        type: DataTypes.DATE,
        allowNull: true

    },
    cancelledReason: {
        type: DataTypes.STRING,
        allowNull: true

    },

    cancelledBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: "id"
        }
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    couponId: {
        type: DataTypes.INTEGER,
        references: {
            model: Coupon,
            key: "id"
        }
    }
}, {
    paranoid: true
})

module.exports = Order