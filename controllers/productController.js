const { asyncMiddleware } = require("../middlewares/asyncMiddleware")
const Product = require("../models/mysql/Product")
const User = require("../models/mysql/User")
const { ErrorResponse } = require("../response/errorResponse")

const createProduct = asyncMiddleware(async (req, res, next) => {

    const FILE_LIMIT = 5 // 5MB
    const filename = req.file?.filename
    const size = req.file?.size
    const { name, description, price, amount, categoryId } = req.body

    if (size && size > FILE_LIMIT * 1024 * 1024) {
        throw new ErrorResponse(400, "File too large")
    }

    await Product.create({
        name,
        description,
        price,
        amount,
        categoryId,
        photo: filename
    })

    res.status(200).json({
        success: true,
        message: "Create product succsessfully!"
    })
})
const getProducts = asyncMiddleware(async (req, res, next) => {
    const products = await Product.findAll()

    res.status(200).json({
        success: true,
        data: products
    })
})
const deleteProduct = asyncMiddleware(async (req, res, next) => {
    const { id } = req.params

    await Product.destroy({
        where: {
            id
        }
    })

    res.status(200).json({
        success: true,
        message: "Delete product successfully!"
    })
})
const updateProduct = asyncMiddleware(async (req, res, next) => {
    const { id } = req.params
    const { name, description, price, amount, categoryId } = req.body

    await Product.update({
        name, description, price, amount, categoryId
    },
        {
            where: {
                id
            }
        })

    res.status(200).json({
        success: true,
        message: "Update product successfully!"
    })
})

module.exports = {
    createProduct,
    getProducts,
    deleteProduct,
    updateProduct
}