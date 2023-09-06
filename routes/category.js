const express = require("express")
const validator = require("../middlewares/validator")
const categoryController = require("../controllers/categoryController")
const router = express.Router()
const jwtAuth = require("../middlewares/jwtAuth")
const categorySchema = require("../validations/categorySchema")

router.get("/", categoryController.getCategory)
router.post("/", validator(categorySchema.createCategory), categoryController.createCategory)
router.patch("/:id", validator(categorySchema.updateCategory), categoryController.updateCategory)
router.delete("/:id", categoryController.deleteCategory)

module.exports = router