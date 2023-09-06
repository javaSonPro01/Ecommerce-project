const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads/'))
    },
    filename: (req, file, cb) => {
        const { fieldname, originalname } = file
        const ext = path.extname(originalname)
        cb(null, `${fieldname}-${Date.now()}${ext}`)
    }
})
// loc file 
const fileFilter = (req, file, cb) => {
    const { originalname } = file
    if (!originalname.match(/\.(jpg||jpeg||png)$/i)) {
        cb(new Error(`Do not support ${path.extname(originalname)}`), false)
    }
    cb(null, true)
}
const FILE_LIMIT = 5 // 5MB
const limits = {
    fileSize: FILE_LIMIT * 1024 * 1024
}
const upload = multer({ storage, fileFilter, limits })

module.exports = upload