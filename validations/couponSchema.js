const Joi = require("./joi")

const createCoupon = Joi.object({
    name: Joi.string().allow(null, ""),
    code: Joi.string().allow(null, ""),
    discount: Joi.number().allow(null, 0),
})

module.exports = {
    createCoupon,
}
