const express = require("express")
const roleController = require("../controllers/roleController")
const validator = require("../middlewares/validator")
const router = express.Router()
const roleSchema = require("../validations/roleSchema")

router.patch("/", validator(roleSchema.updateRole), roleController.updateRole)

module.exports = router