// upload.js
const multer = require('multer');
const { v4: uuid } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/uploads');
    },
    filename: function (req, file, cb) {
        const unique = uuid().toString();
        cb(null, unique + path.extname(file.originalname));
    },
});

const uploads = multer({ storage: storage });

module.exports = uploads;
