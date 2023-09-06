const Address = require("./Address");
const User = require("./User")
const Category = require("../../models/mysql/Category")
const Product = require("../../models/mysql/Product");
const Role = require("../../models/mysql/Role");
const Order = require("./Order");
const OrderProduct = require("./OrderProduct");
const Coupon = require("./Coupon");

//1-1
User.hasOne(Address, {
    foreignKey: "userId"
})
Address.belongsTo(User, {
    foreignKey: "userId"
})

//1-n
Category.hasMany(Product, {
    foreignKey: "categoryId"
})
Product.belongsTo(Category, {
    foreignKey: "categoryId"
})

//1-n
Role.hasMany(User, {
    foreignKey: "role"
})
User.belongsTo(Role, {
    foreignKey: "role"
})

// n - n
Product.belongsToMany(Order, {
    through: OrderProduct,
    foreignKey: "productId"
})

Order.belongsToMany(Product, {
    through: OrderProduct,
    foreignKey: "orderId"
})

// 1 - n
User.hasMany(Order, {
    foreignKey: "userId"
})
Order.belongsTo(User, {
    foreignKey: "userId"
})


//Order - coupon
Coupon.hasMany(Order, {
    foreignKey: "couponId",
});
Order.belongsTo(Coupon, {
    foreignKey: "couponId",
})