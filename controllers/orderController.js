const { asyncMiddleware } = require("../middlewares/asyncMiddleware")
const Order = require("../models/mysql/Order")
const OrderProduct = require("../models/mysql/OrderProduct")
const Product = require("../models/mysql/Product")
const { ErrorResponse } = require("../response/errorResponse")


const createOrder = asyncMiddleware(async (req, res, next) => {
    const { note, products } = req.body
    const { id: userId } = req.user
    // Tao ra don hang voi note va user truoc
    const order = await Order.create({
        note,
        userId
    })


    // const productIds = products.map((product) => product.id)
    // const productQuantities = products.map((product) => product.quantity)
    // await order.addProducts(productIds, {
    //     through: {
    //         quantity: productQuantities
    //     }
    // })

    // Tu mang product chuyen sang thong tin can thiet
    const prods = products.map((product) => ({
        orderId: order.id,
        productId: product.id,
        quantity: product.quantity
    }))
    await OrderProduct.bulkCreate(prods)


    res.status(201).json({
        success: true,

    })
})

// const getOrderDetailById = asyncMiddleware(async (req, res, next) => {


//     const { id: userId } = req.user
//     const { id: orderId } = req.params
//     const order = await Order.findOne({
//         where: {
//             id: orderId, // don hang nao
//             userId // cua user nao
//         },
//         include: [Product]
//     })

//     res.status(200).json({
//         success: true,
//         data: order

//     })
// })

const getOrderDetailById = asyncMiddleware(async (req, res, next) => {


    const { id: userId } = req.user
    const { id: orderId } = req.params
    const order = await Order.findOne({
        where: {
            id: orderId, // don hang nao
            userId, // cua user nao
        },
        include: [Product]
    })

    res.status(200).json({
        success: true,
        data: order

    })
})

const getAllOrder = asyncMiddleware(async (req, res, next) => {


    const { id: userId, role } = req.user

    let orders = []
    if (role === "customer") {
        orders = await Order.findAll({
            where: {
                userId,
            },
            include: [Product]
        })
    }
    if (role === "owner") {
        orders = await Order.findAll({

            include: [Product]
        })
    }

    res.status(200).json({
        success: true,
        data: orders

    })
})

const deleteOrderById = asyncMiddleware(async (req, res, next) => {
    const { id } = req.params
    // Delete trong bang Orders
    await Order.destroy({
        where: {
            id
        }
    })
    //Sau do delete trong bang OrderProduct
    await OrderProduct.destroy({
        where: {
            orderId: id,
        }
    })

    res.status(200).json({
        success: true
    })
})

const canceleOrder = asyncMiddleware(async (req, res, next) => {
    //Lay ra userId va role khi dang nhap
    const { id: userId, role } = req.user
    //Lay ra id cua don hang tu api endpoin
    const { id: orderId } = req.params
    //Lay li do tu body
    const { reason } = req.body

    //Tim don hang trong DB
    const order = await Order.findOne({
        where: {
            id: orderId,
        }
    })
    //Khong tim duoc
    if (!order) {
        throw new ErrorResponse(404, "Don hang khong ton tai nhe!")
    }

    //Neu trang thai don hang khong phai la pending hoac approved thi throw loi
    if (!(["pending", "approved"].includes(order.status))) {
        throw new ErrorResponse(400, "Don hang nay khong duoc xoa vi trang thai khong cho phep!")

    }
    //lay ra userId cua don hang muon xoa
    const { userId: orderUserId } = order
    //Neu user dang nhap la customer nhung don hang khong phai cua user do
    if (role === "customer" && orderUserId !== userId) {
        throw new ErrorResponse(403, "Don hang nay cua nguoi khac ai cho ban huy?")
    }

    //Neu role la khach hang va trang thoi don hang ko phai la pending thi ko cho huy
    if (role === "customer" && order.status !== "pending") {
        throw new ErrorResponse(400, "Don hang nay dang duoc xu li vi vay KH khong huy duoc!")
    }

    //Sau khi check role va trang thai on het roi thi luu
    order.status = "cancelled"
    order.cancelledBy = userId
    order.cancelled_at = new Date()
    order.cancelledReason = reason
    await order.save()

    res.status(200).json({
        success: true,
        message: "Order cancelled!"
    })
})

const setOrderDone = asyncMiddleware(async (req, res, next) => {
    const { id } = req.params
    const order = await Order.findOne({
        where: {
            id
        }
    })
    if (!order) {
        throw new ErrorResponse(404, "Order not found!")
    }
    order.status = "done"
    order.received_at = new Date()
    order.save()

    res.json({
        success: true,
        message: "Don hang da hoan thanh"
    })
})

const setOrderDelivery = asyncMiddleware(async (req, res, next) => {
    const { id } = req.params
    const order = await Order.findOne({
        where: {
            id
        }
    })
    if (!order) {
        throw new ErrorResponse(404, "Order not found!")
    }
    order.status = "delivery"
    order.save()

    res.json({
        success: true,
        message: "Don hang dang duoc giao"
    })
})


module.exports = {
    createOrder,
    getOrderDetailById,
    getAllOrder,
    deleteOrderById,
    canceleOrder,
    setOrderDone,
    setOrderDelivery,
}