"use strict";
const multer = require('multer');
const path = require('path');

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `imagen${Date.now()}${ext}`);  // Genera un nombre único para cada archivo
    }
});
const upload = multer({ storage });

exports.uploadFile = (req, res) => {
    upload.single('img')(req, res, (err) => {
        if (err) {
            return res.status(500).send({ message: 'Error al subir el archivo', error: err });
        }
        if (!req.file) {
            return res.status(400).send('No files were uploaded.');
        }
        // Asegurarse de que imgPath no incluya 'uploads/' dos veces
        res.send({ state: 'Success', imgPath: `uploads/${req.file.filename}` });
    });
};
