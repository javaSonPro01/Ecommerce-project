
require('dotenv').config()
const nodemailer = require('nodemailer');
const { env } = require("./config/env");
const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
)


oAuth2Client.setCredentials({ refresh_token: env.GOOGLE_REFRESH_TOKEN })


oAuth2Client.getAccessToken().then((refreshToken) => {
    const accessToken = refreshToken.token
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }
    })
    transporter
        .sendMail({
            from: `Nguyen The Son dep trai <${env.GOOGLE_TEST_EMAIL}>`,
            to: "hoaixuan2001@gmail.com",
            subject: "Test Email Lan thu N",
            text: "Hello em nguoi yeu",
            html: "<h1>Test Email Ne hihih</h1>",
            auth: {
                user: env.GOOGLE_TEST_EMAIL,
                refreshToken: env.GOOGLE_REFRESH_TOKEN,
                accessToken,
            }
        })
        .then((data) => { console.log(data) })
})

