
const MongoDB = require("../database/mongoo/connect")
const express = require('express');
const { ErrorResponse } = require('../response/errorResponse');

const router = express.Router()

router.get("/:filename", async (req, res, next) => {
    const filename = req.params.filename
    const file = await MongoDB.gfs.find({ filename }).toArray((err, files) => {
    })
    if (!file || !file.length) {
        return next(new ErrorResponse(404, "File not found"))
    }
    MongoDB.gfs.openDownloadStreamByName(filename).pipe(res)
})

module.exports = router