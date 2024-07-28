const multer = require('multer');
const path = require('path');

const storageProductos = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/productos');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `imagen${Date.now()}${ext}`);
    }
});

const uploadProductos = multer({ storage: storageProductos });

module.exports = uploadProductos;
