//require libraries
require("dotenv").config()
const { env } = require("./config/env");
const express = require("express"); // npm i express
const cors = require("cors")
const morgan = require("morgan");
//require routes
const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")
const categoryRouter = require("./routes/category")
const productRouter = require("./routes/product")
const roleRouter = require("./routes/role")
const orderRouter = require("./routes/order")
const fileRouter = require("./routes/file")
const couponRouter = require("./routes/coupon")
//require models
const { roles } = require("./constant/roles");
const Role = require("./models/mysql/Role");
require("./models/mysql/relationship")
//require middleware
const errMiddleware = require("./middlewares/errorMiddleware");
const jwtAuth = require("./middlewares/jwtAuth");
const authorize = require("./middlewares/authorize");
const upload = require("./middlewares/upload");
const { limiter } = require("./middlewares/limiter");
// require database
const sequelize = require("./database/mysql/connect");
const MongoDB = require("./database/mongoo/connect");
//port
const app = express()
const PORT = env.PORT || 3000

//express.json()
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

//connect DB with mongoo
MongoDB.connect()
//connect DB with sequelize
sequelize.sync({ force: false, logging: false }).then(() => {
    console.log("----------Connected DB Successfully!------------")
})
    .then(() => {
        Role.bulkCreate(roles, {
            ignoreDuplicates: true
        }).then(() => {
            console.log("--------Roles inserted-----------")
        }
        )
    })
    .catch(() => {
        console.log("------Not connect DB--------")
    })

//API
app.use("/uploads", express.static("uploads"))
app.use("/auth", limiter({ max: 3 }), authRouter)
app.use("/user", userRouter)
app.use("/role", jwtAuth, authorize("super_admin"), roleRouter)
app.use("/category", jwtAuth, authorize("owner"), categoryRouter)
app.use("/product", productRouter)
app.use("/order", orderRouter)
app.use("/file", fileRouter)
app.use("/coupon", jwtAuth, authorize("owner"), couponRouter)

//err middleware -- su dung duoi router de co bat cu loi gi se duoc pass qua err middleware
app.use(errMiddleware)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})