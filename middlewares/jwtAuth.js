const { env } = require("../config/env");
const jwt = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
    const headerToken = req.headers.authorization;

    if (!headerToken || !headerToken.startsWith("Bearer ")) {
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
        const user = jwt.verify(token, env.SECRET_KEY);
        req.user = user; // gan user vao req de ben controller lay duoc
        console.log(req.user);
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
};

module.exports = jwtAuth;
