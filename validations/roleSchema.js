const Joi = require("./joi")
//
const updateRole = Joi.object({
    userId: Joi.number().required(),
})
//
module.exports = {
    updateRole
}
