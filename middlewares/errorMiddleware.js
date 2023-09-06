const errMiddleware = (err, req, res, next) => {
    console.log("------------Error Middleware------------");
    const { code, message } = err
    res.status(typeof code === "number" ? code : 500).json({
        success: false,
        message: message || "Internal Error."
    })
}
module.exports = errMiddleware