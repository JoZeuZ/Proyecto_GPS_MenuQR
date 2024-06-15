const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const upload = require('../config/multerConfig'); 
const { uploadFile, updateImage } = require('../services/uploads.service');

router.delete('/uploads/ingredientes/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imageFullPath = path.join(__dirname, '..', 'uploads', 'ingredientes', imageName);

    console.log('Intentando eliminar la imagen en la ruta:', imageFullPath);

    fs.access(imageFullPath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Imagen no encontrada en la ruta especificada:', imageFullPath);
            return res.status(404).json({ message: 'Image not found' });
        } else {
            fs.unlink(imageFullPath, (err) => {
                if (err) {
                    console.error('Error eliminando la imagen:', err);
                    return res.status(500).json({ message: 'Error deleting the image', error: err });
                } else {
                    console.log('Imagen eliminada:', imageFullPath);
                    return res.status(200).json({ message: 'Image deleted successfully' });
                }
            });
        }
    });
});

// Ruta para subir archivos
router.post('/upload', upload.single('img'), uploadFile);

// Ruta para modificar archivos
router.put('/:imageName', upload.single('img'), updateImage);

module.exports = router;
