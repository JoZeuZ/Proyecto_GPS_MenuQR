"use strict";
const { handleError } = require('../utils/errorHandler');
const Ingrediente = require('../models/ingredientes.model');
const fs = require('fs');
const path = require('path');

async function getIngredientes() {
    try {
        const ingredientes = await Ingrediente.find().exec();
        if (!ingredientes) return [null, "No hay ingredientes"];
        return [ingredientes, null];
    } catch (error) {
        handleError(error, "ingredientes.service -> getIngredientes");
    }
}

async function getIngredienteById(id) {
    try {
        const ingrediente = await Ingrediente.findById(id).exec();
        if (!ingrediente) return [null, "No existe el ingrediente"];
        return [ingrediente, null];
    } catch (error) {
        return [null, "Error al buscar el ingrediente"];
    }
}

async function createIngrediente(ingrediente) {
    try {
        const existingIngrediente = await Ingrediente.findOne({ nombre: ingrediente.nombre }).exec();
        if (existingIngrediente) return [null, "Ya existe un ingrediente con ese nombre"];
        const newIngrediente = new Ingrediente(ingrediente);
        const ingredienteGuardado = await newIngrediente.save();
        return [ingredienteGuardado, null];
    } catch (error) {
        handleError(error, "ingredientes.service -> createIngrediente");
        return [null, "Error al crear el ingrediente"];
    }
}

async function updateIngrediente(id, ingrediente) {
    try {
        const ingredienteExistente = await Ingrediente.findOne({ nombre: ingrediente.nombre, _id: { $ne: id } }).exec();
        if (ingredienteExistente) return [null, "Ya existe un ingrediente con ese nombre"];
    
        const ingredienteActualizado = await Ingrediente.findByIdAndUpdate(id, ingrediente, { new: true }).exec(); 
        if (!ingredienteActualizado) return [null, "No se encontró el ingrediente"];
        return [ingredienteActualizado, null];
    } catch (error) {
        handleError(error, "ingredientes.service -> updateIngrediente");
        return [null, "Error al actualizar el ingrediente"];
    }
}

async function deleteIngrediente(id) {
    try {
        const ingrediente = await Ingrediente.findById(id).exec();
        if (!ingrediente) return [null, "No se encontró el ingrediente"];

        // Verificar la ruta de la imagen
        const imagePath = path.join(__dirname, '..', ingrediente.img);
        
        // Eliminar la imagen asociada
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        } else {
            console.log(`Imagen no encontrada: ${imagePath}`);
        }

        const ingredienteEliminado = await Ingrediente.findByIdAndDelete(id).exec();
        if (!ingredienteEliminado) return [null, "No se encontró el ingrediente"];
        return [ingredienteEliminado, null];
    } catch (error) {
        handleError(error, "ingredientes.service -> deleteIngrediente");
        return [null, "Error al eliminar el ingrediente"];
    }
}

module.exports = {
    getIngredientes,
    getIngredienteById,
    createIngrediente,
    updateIngrediente,
    deleteIngrediente,
};
