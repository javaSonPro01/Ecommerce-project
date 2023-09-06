const Sequelize = require("sequelize")
const { env } = require("../../config/env");

const sequelize = new Sequelize(env.MYSQL_DATABASE, env.MYSQL_USER, env.MYSQL_PASSWORD, {
    "host": env.MYSQL_HOST,
    "post": env.PORT,
    "dialect": "mysql",
})
module.exports = sequelize