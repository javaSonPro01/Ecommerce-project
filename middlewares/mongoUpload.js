const multer = require('multer');
const path = require('path');
const { GridFsStorage } = require('multer-gridfs-storage');
const env = require('../config/env');
const crypto = require('crypto');

const storage = new GridFsStorage({
    url: 'mongodb://127.0.0.1:27017/nodejs-course',
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(20, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname)
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                }
                resolve(fileInfo)
            })
        })
    }
});
const fileFilter = (req, file, cb) => {
    const { originalname } = file
    if (!originalname.match(/\.(jpg||jpeg||png||mp4)$/i)) {
        cb(new Error(`Do not support ${path.extname(originalname)}`), false)
    }
    cb(null, true)
}
const mongoUpload = multer({ storage, fileFilter })

module.exports = mongoUpload