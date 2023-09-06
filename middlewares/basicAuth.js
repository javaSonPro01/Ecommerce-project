const { env } = require("../config/env");
const jwt = require("jsonwebtoken");

const basicAuth = (req, res, next) => {

    if (env.ENV !== "development") {
        next();
        return;
    }
    const headerToken = req.headers.authorization;

    if (!headerToken || !headerToken.startsWith("Basic ")) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
    const token = headerToken.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
    try {

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
};

module.exports = basicAuth;
