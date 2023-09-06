const nodemailer = require('nodemailer');
const generateOauth2AccessToken = require("../utils/generateOauth2AccessToken")
const { env } = require("../config/env")
class EmailService {
    constructor() {
        this.initTransporter()
    }
    initTransporter() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                clientId: env.GOOGLE_CLIENT_ID,
                clientSecret: env.GOOGLE_CLIENT_SECRET,
            }
        })
    }

    async sendMail({ to, subject, text, html }) {
        const accessToken = await generateOauth2AccessToken()
        this.transporter
            .sendMail({
                from: `Nguyen The Son dep trai <${env.GOOGLE_TEST_EMAIL}>`,
                to,
                subject,
                text,
                html,
                auth: {
                    user: env.GOOGLE_TEST_EMAIL,
                    refreshToken: env.GOOGLE_REFRESH_TOKEN,
                    accessToken,
                }
            })
    }
}

module.exports = new EmailService()