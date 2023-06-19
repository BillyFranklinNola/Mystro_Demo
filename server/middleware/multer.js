const multer = require('multer');
const path = require('path');

const storageEngine = multer.diskStorage({
    destination: "./images",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});

const upload = multer({ storage: storageEngine });

module.exports = upload;