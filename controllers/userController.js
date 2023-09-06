const { asyncMiddleware } = require("../middlewares/asyncMiddleware")
const Address = require("../models/mysql/Address")
const User = require("../models/mysql/User")
const { ErrorResponse } = require("../response/errorResponse")
const bcrypt = require("bcryptjs")
const hashPassword = require("../utils/hashPassword")
const randomBytes = require("../utils/randomBytes")
const ForgotToken = require("../models/mongoo/ForgotToken")
const mail = require("../services/mail");

require('dotenv').config()
const updateAddress = asyncMiddleware(async (req, res, next) => {
    const { city, province, address, zip } = req.body

    //Dang nhap thanh cong se lay duoc req.user tu jwk tra ve
    const { id: userId } = req.user

    //Cach 1: Khi dang ki da tao 1 dia chi cho user do nhung gia tri rong sau do moi update
    // await Address.update({
    //     city,
    //     address,
    //     province,
    //     zip
    // },
    //     {
    //         where: {
    //             userId
    //         }
    //     })

    //Cach 2: Tim xem trong Address co User do chua
    const user = await Address.findOne({
        where: {
            userId
        }
    })
    if (!user) {
        throw new ErrorResponse(404, "User not found!")
    }
    await Address.update({
        city,
        address,
        province,
        zip
    },
        {
            where: {
                userId
            }
        })

    res.status(200).json({
        success: true,
        message: "update address successfully!"
    })
})

const getProfile = asyncMiddleware(async (req, res, next) => {
    //Sau khi login
    const { id: userId } = req.user

    const user = await User.findByPk(userId, {
        attributes: {
            exclude: ["password", "email"]
        },
        include: {
            model: Address,
            attributes: ["city"]
        } // popular -- Lay ca thong tin ben bang Address ma no tro den
    })

    res.status(200).json({
        success: true,
        data: user
    })
})

const changePassword = asyncMiddleware(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body
    const { id: userId } = req.user

    if (oldPassword === newPassword) {
        throw new ErrorResponse(400, "New password must be different from old password")
    }
    const user = await User.findByPk(userId)

    const isMatch = bcrypt.compareSync(oldPassword, user.password)
    if (!isMatch) {
        throw new ErrorResponse(400, "Invalid password")
    }
    const hashedPassword = hashPassword(newPassword)

    await user.update({
        password: hashedPassword,
    })
    res.status(200).json({
        success: true,
        message: "Change password successfully!"
    })
})

const forgotPassword = asyncMiddleware(async (req, res, next) => {
    const { email } = req.body

    const existToken = await ForgotToken.findOne({ email: email })
    if (existToken) {
        throw new ErrorResponse(400, "Please check your email")
    }
    const user = await User.findOne({
        where: { email: email }
    })

    if (!user) {
        throw new ErrorResponse(404, "User not found")
    }

    //generate forgot password token
    const token = randomBytes(32)
    // save token to DB
    const forgotPasswordToken = new ForgotToken({ email: email, token: token })
    //send mail
    const link = `${process.env.CLIENT_URL}/forgot-password/${token}`

    const sendMail = mail.sendMail({
        to: email,
        subject: 'Forgot Password',
        html: `<h1> Click <a href= "${link}"> here </a> to reset password </h1>`
    })
    await Promise.all([
        forgotPasswordToken.save(),
        sendMail
    ])
    res.status(200).json({
        success: true,
        massage: "Please check your email to reset your password"
    })
})

const verifyForgotToken = asyncMiddleware(async (req, res, next) => {
    const { token } = req.body

    const tokenDoc = await ForgotToken.findOne({ token: token })

    if (!tokenDoc) {
        throw new ErrorResponse(400, 'Token not found')
    }

    res.status(200).json({
        success: true,
        user: tokenDoc.email
    })
})

const resetPassword = asyncMiddleware(async (req, res, next) => {
    const { email, token, newPassword } = req.body

    const tokenDoc = await ForgotToken.findOne({ email: email, token: token })

    if (!tokenDoc) {
        throw new ErrorResponse(400, "Invalid token")
    }
    const hashNewPassword = hashPassword(newPassword)

    await Promise.all([
        User.update({
            password: hashNewPassword
        }, {
            where: {
                email
            }
        }),

        ForgotToken.deleteOne({
            email,
            token
        })
    ])
    res.status(200).json({
        success: true,
        message: "Reset password successfully"
    })
})

module.exports = {
    updateAddress,
    getProfile,
    changePassword,
    forgotPassword,
    verifyForgotToken,
    resetPassword
}