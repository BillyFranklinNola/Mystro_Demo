const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf', 'application/x-zip', 'application/x-zip-compressed', 'application/zip', 'text/html'];
    if (allowedFileTypes.includes(file.mimetype)) {
        console.log('destination:', file);
        cb(null, true);
    } else {
        console.log('Original filename:', file.originalname);
        cb(null, false);
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10000000 }
});

module.exports = {upload};