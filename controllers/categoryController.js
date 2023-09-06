const { asyncMiddleware } = require("../middlewares/asyncMiddleware")
const Category = require("../models/mysql/Category")
const { ErrorResponse } = require("../response/errorResponse")

const createCategory = asyncMiddleware(async (req, res, next) => {
    const { name, slug } = req.body

    await Category.create({
        name, slug
    })

    res.status(200).json({
        success: true,
        message: "Create successfully!"
    })
})

const getCategory = asyncMiddleware(async (req, res, next) => {
    const categories = await Category.findAll()

    if (!categories) {
        throw new ErrorResponse(404, "Category is empty!")
    }
    res.status(200).json({
        success: true,
        data: categories
    })
})

const updateCategory = asyncMiddleware(async (req, res, next) => {
    const { id } = req.params
    const { name, slug } = req.body

    await Category.update({
        name, slug
    }, {
        where: {
            id
        }
    })

    res.status(200).json({
        success: true,
        message: "Update successfully!"
    })
})

const deleteCategory = asyncMiddleware(async (req, res, next) => {
    const { id } = req.params

    await Category.destroy({
        where: {
            id
        }
    })

    res.status(200).json({
        success: true,
        message: "Delete successfully!"
    })
})

module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}