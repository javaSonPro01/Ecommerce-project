const { asyncMiddleware } = require("../middlewares/asyncMiddleware")
const User = require("../models/mysql/User")

const updateRole = asyncMiddleware(async (req, res, next) => {
    const { userId } = req.body
    await User.update({
        role: "owner"
    }, {
        where: {
            id: userId
        }
    })

    res.status(200).json({
        success: true,
        message: "Update successfully!"
    })
})
module.exports = {
    updateRole
}