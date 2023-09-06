const express = require("express")
const validator = require("../middlewares/validator")
const productController = require("../controllers/productController")
const router = express.Router()
const jwtAuth = require("../middlewares/jwtAuth")
const categorySchema = require("../validations/categorySchema")
const authorize = require("../middlewares/authorize")
const upload = require("../middlewares/upload")
const mongoUpload = require("../middlewares/mongoUpload")

router.get("/", productController.getProducts)
router.post("/", jwtAuth, authorize("owner"), mongoUpload.single("photo"), productController.createProduct)
router.patch("/:id", jwtAuth, authorize("owner"), productController.updateProduct)
router.delete("/:id", jwtAuth, authorize("owner"), productController.deleteProduct)

module.exports = router