const fs = require('fs');
const path = require('path');
const Ingrediente = require('../models/ingredientes.model');

exports.uploadFile = (req, res) => {
    const newImage = req.file;
    if (!newImage) {
        console.error('No files were uploaded.');
        return res.status(400).send('No files were uploaded.');
    }
    console.log('Archivo subido correctamente:', newImage.filename);
    res.send({ state: 'Success', imgPath: `uploads/ingredientes/${newImage.filename}` });
};

exports.updateImage = (req, res) => {
    const imageName = req.params.imageName;
    const { nombre, disponible, oldImg } = req.body;
    let imgPath;

    if (req.file) {
        imgPath = 'uploads/ingredientes/' + req.file.filename;
    } else {
        imgPath = oldImg; // Mantener la imagen antigua si no se subió una nueva
    }

    Ingrediente.findByIdAndUpdate(
        imageName,
        { nombre, disponible, img: imgPath },
        { new: true },
        (err, updatedIngredient) => {
            if (err) {
                return res.status(500).json({ message: 'Error updating ingredient', error: err });
            }

            // Después de actualizar el ingrediente, intentamos eliminar la imagen anterior
            if (req.file && oldImg) {
                const oldImageFullPath = path.join(__dirname, '..', oldImg);
                console.log('Ruta de la imagen anterior a eliminar:', oldImageFullPath);
                fs.unlink(oldImageFullPath, (err) => {
                    if (err) {
                        console.error('Error deleting the old image:', err);
                        return res.status(200).json({
                            message: 'Ingredient updated successfully, but failed to delete old image',
                            data: updatedIngredient
                        });
                    } else {
                        console.log('Old image deleted:', oldImageFullPath);
                        return res.status(200).json({
                            message: 'Ingredient updated successfully and old image deleted',
                            data: updatedIngredient
                        });
                    }
                });
            } else {
                return res.status(200).json({
                    message: 'Ingredient updated successfully',
                    data: updatedIngredient
                });
            }
        }
    );
};
