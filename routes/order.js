const express = require("express")
const validator = require("../middlewares/validator")
const orderController = require("../controllers/orderController")
const router = express.Router()
const jwtAuth = require("../middlewares/jwtAuth")
const authorize = require("../middlewares/authorize")
const orderSchema = require("../validations/orderSchema")

//Tao don hang
router.post("/", jwtAuth, authorize("customer"), validator(orderSchema.createOrder), orderController.createOrder)
//Xoa don hang
router.delete("/:id", jwtAuth, authorize("owner"), orderController.deleteOrderById)
//Xem don hang
router.get("/:id", jwtAuth, authorize("customer"), orderController.getOrderDetailById)
//Xem tat ca don hang
router.get("", jwtAuth, authorize("customer", "owner"), orderController.getAllOrder)
//Huy don hang
router.patch("/:id/cancele", jwtAuth, authorize("owner", "customer"), validator(orderSchema.cancleOrder), orderController.canceleOrder)
//Cap nhat don hang
router.patch("/:id/done", jwtAuth, authorize("owner"), orderController.setOrderDone)
//Giao hang
router.patch("/:id/delivery", jwtAuth, authorize("owner"), orderController.setOrderDelivery)

module.exports = router