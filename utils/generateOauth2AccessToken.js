const { google } = require('googleapis');
const { env } = require('../config/env');

const generateOauth2AccessToken = async () => {
    const oAuth2Client = new google.auth.OAuth2(
        env.GOOGLE_CLIENT_ID,
        env.GOOGLE_CLIENT_SECRET,
    )
    oAuth2Client.setCredentials({ refresh_token: env.GOOGLE_REFRESH_TOKEN })
    const accessToken = await oAuth2Client.getAccessToken()
    return accessToken
}

module.exports = generateOauth2AccessToken

