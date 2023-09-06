const { asyncMiddleware } = require("../middlewares/asyncMiddleware")
const Product = require("../models/mysql/Product")
const User = require("../models/mysql/User")
const { ErrorResponse } = require("../response/errorResponse")

const createCoupon = asyncMiddleware(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Create succsessfully!"
    })
})

const getCoupon = asyncMiddleware(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Create succsessfully!"
    })
})

const getCouponById = asyncMiddleware(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Create succsessfully!"
    })
})

const updateCoupon = asyncMiddleware(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Create succsessfully!"
    })
})

const deleteCoupon = asyncMiddleware(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Create succsessfully!"
    })
})

module.exports = {
    createCoupon,
    getCoupon,
    getCouponById,
    updateCoupon,
    deleteCoupon
}