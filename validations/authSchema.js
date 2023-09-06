const Joi = require("./joi")
//
const emailSchema = Joi.string().email().required()
const pwSchema = Joi.string().min(6).required()
//
const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: emailSchema,
    password: pwSchema,
    phone: Joi.string().required(),
    roleId: Joi.number()
})
//
const loginSchema = Joi.object({
    email: emailSchema,
    password: pwSchema
})

const verifyOtpSchema = Joi.object({
    email: emailSchema,
    otp: Joi.string().min(6).max(6).required()
})
//
module.exports = {
    registerSchema,
    loginSchema,
    emailSchema,
    pwSchema,
    verifyOtpSchema
}
