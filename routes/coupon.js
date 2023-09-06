const express = require("express")
const validator = require("../middlewares/validator")
const couponController = require("../controllers/couponController")
const router = express.Router()
const jwtAuth = require("../middlewares/jwtAuth")
const couponSchema = require("../validations/couponSchema")
router.get("/", couponController.getCoupon)
router.get("/:id", couponController.getCouponById)
router.post("/", validator(couponSchema.createCoupon), couponController.createCoupon)
router.patch("/:id", couponController.updateCoupon)
router.delete("/:id", couponController.deleteCoupon)

module.exports = router