const { env } = require("../config/env");
const RegisterOtp = require("../models/mongoo/RegisterOtp")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { asyncMiddleware } = require("../middlewares/asyncMiddleware")
const { ErrorResponse } = require("../response/errorResponse");
const User = require("../models/mysql/User");
const Address = require("../models/mysql/Address");
const mail = require("../services/mail");
const generateOtp = require("../utils/otp");


const register = asyncMiddleware(async (req, res, next) => {
    const { username, email, password, phone, role } = req.body
    //check email
    const isExistedEmail = await User.findOne({
        where: {
            email,
        }
    })
    //ton tai
    if (isExistedEmail) {
        throw new ErrorResponse(409, "email already exits!")
    }
    //chua ton tai
    //hashpass
    const salt = bcrypt.genSaltSync(12)
    const hashedPassword = bcrypt.hashSync(password, salt)
    // tao user
    const user = await User.create({
        username,
        email,
        phone,
        password: hashedPassword,
        role,
    })
    //tao otp
    const otp = generateOtp()
    //tao otp trong mongoose
    const registerOtp = new RegisterOtp({
        email,
        otp
    })
    //Chay 3Promise
    Promise.all([
        registerOtp.save(),
        Address.create({
            city: "",
            address: "",
            province: "",
            zip: "",
            userId: user.id,
        }),
        mail.sendMail({
            to: email,
            subject: "YOUR OTP",
            html: `Your otp code: ${otp}</p>`
        })
    ])
    res.status(201).json({
        success: true
    })
})
const login = asyncMiddleware(async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({
        where: {
            email,
        }
    })

    if (!user) {
        throw new ErrorResponse(401, "unauthorized")
    }

    //check pass
    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) {
        throw new ErrorResponse(401, "unauthorized")
    }

    //tao jwt
    const token = jwt.sign({ id: user.id }, env.SECRET_KEY, { expiresIn: env.EXPIRED_IN })
    res.json({
        success: true,
        token
    })
})
const verifyOtp = asyncMiddleware(async (req, res, next) => {
    const { email, otp } = req.body

    const user = await RegisterOtp.findOne({ email })
    if (!user) {
        throw new ErrorResponse(401, "unauthorized")
    }

    if (!user.otp === otp) {
        throw new ErrorResponse(400, "Can not verify otp")
    }

    const Update = User.update({ isVerified: true }, {
        where: {
            email
        }
    })
    const DeleteOtp = RegisterOtp.deleteOne({ email })

    await Promise.all([Update, DeleteOtp])
    res.json({
        success: true,
        message: "Verify otp successfully"
    })
})
module.exports = {
    register,
    login,
    verifyOtp
}