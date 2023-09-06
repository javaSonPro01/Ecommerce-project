const express = require("express")
const validator = require("../middlewares/validator")
const userSchema = require("../validations/userSchema")
const userController = require("../controllers/userController")
const router = express.Router()
const jwtAuth = require("../middlewares/jwtAuth")


router.patch("/address", validator(userSchema.updateAddress), jwtAuth, userController.updateAddress)
router.get("/profile", jwtAuth, userController.getProfile)
router.patch("/change-password", jwtAuth, validator(userSchema.changePassword), userController.changePassword)
router.post("/forgot-password", validator(userSchema.forgotPassword), userController.forgotPassword)
router.post("/verify-token", validator(userSchema.verifyForgotToken), userController.verifyForgotToken)
router.post("/reset-password", validator(userSchema.resetPassword), userController.resetPassword)
module.exports = router