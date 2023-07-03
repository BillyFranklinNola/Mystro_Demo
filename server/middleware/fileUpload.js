const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
            cb(null, '../uploads/');
        },
    filename: (req, file, cb) => {
            cb(null, uuidv4() + '-' + Date.now().toString() + path.extname(file.originalname));
        }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        console.log('destination:', file);
        cb(null, true);
    } else {
        console.log('Original filename:', file.originalname);
        cb(null, false);
    }
}

const upload = multer({storage: storage, fileFilter: fileFilter});

module.exports = {upload};