const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const uploadIngredientes = require('../config/multerConfig');
const uploadProductos = require('../config/confMulterProductos');
const { uploadFile, updateImage } = require('../services/uploads.service');

// Función auxiliar para eliminar imágenes
function deleteImage(req, res, folder) {
    const imageName = req.params.imageName;
    const imageFullPath = path.join(__dirname, '..', 'uploads', folder, imageName);

    console.log(`Intentando eliminar la imagen en la ruta: ${imageFullPath}`);

    fs.access(imageFullPath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`Imagen no encontrada en la ruta especificada: ${imageFullPath}`);
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
}

// Rutas para ingredientes
router.delete('/uploads/ingredientes/:imageName', (req, res) => {
    deleteImage(req, res, 'ingredientes');
});

// Ruta para subir archivos de ingredientes (mantiene la ruta original para compatibilidad)
router.post('/upload', uploadIngredientes.single('img'), uploadFile);

// Ruta específica para subir archivos de ingredientes
router.post('/upload/ingredientes', uploadIngredientes.single('img'), uploadFile);

// Ruta para modificar archivos de ingredientes
router.put('/:imageName', uploadIngredientes.single('img'), updateImage);

// Rutas para productos
router.delete('/uploads/productos/:imageName', (req, res) => {
    deleteImage(req, res, 'productos');
});

// Ruta para subir archivos de productos
router.post('/upload/productos', uploadProductos.single('img'), (req, res) => {
    // Aquí deberías llamar a una función similar a uploadFile pero para productos
    // Por ahora, usaremos uploadFile como ejemplo
    uploadFile(req, res);
});

// Ruta para modificar archivos de productos
router.put('/productos/:imageName', uploadProductos.single('img'), (req, res) => {
    // Aquí deberías llamar a una función similar a updateImage pero para productos
    // Por ahora, usaremos updateImage como ejemplo
    updateImage(req, res);
});

module.exports = router;