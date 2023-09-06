const rateLimit = require("express-rate-limit")
var MongoStore = require('rate-limit-mongo');


const limiter = ({ windowMs = 1 * 60 * 1000, max = 60 }) => {
    return rateLimit({
        store: new MongoStore({
            uri: 'mongodb://127.0.0.1:27017/nodejs-course',
            expireTimeMs: windowMs,
            errorHandler: console.error.bind(null, 'rate-limit-mongo')
        }),
        windowMs, // 1 minute
        max,
        message: "Too many requests, please try again",
        handler: (req, res, next, options) => {
            res.status(options.statusCode).json({
                success: false,
                message: options.message
            })
        }
    })
}

module.exports = {
    limiter
}