exports.env = {
    PORT: process.env.PORT || 3000,
    ENV: process.env.NODE_DEV || "development",
    SECRET_KEY: process.env.SECRET_KEY || "123456",
    MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/nodejs-course',
    EXPIRED_IN: process.env.EXPIRED_IN || '1d',
    MONGO_BUCKET: process.env.MONGO_BUCKET || 'uploads',

    MYSQL_HOST: process.env.MYSQL_HOST || "localhost",
    MYSQL_PORT: process.env.MYSQL_PORT || 3306,
    MYSQL_USER: process.env.MYSQL_USER || "root",
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "abcxyz",
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || "mydata",

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "123456",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "123456",
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN || "123456",
    GOOGLE_TEST_EMAIL: process.env.GOOGLE_TEST_EMAIL || "test@gmail.com",

    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",

    BASIC_USER: process.env.BASIC_USER || "user",
    BASIC_PASSWORD: process.env.BASIC_PASSWORD || "password"

}