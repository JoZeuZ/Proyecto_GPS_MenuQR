const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/ingredientes');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `imagen${Date.now()}${ext}`);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
