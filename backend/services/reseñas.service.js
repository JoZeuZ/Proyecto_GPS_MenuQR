"use strict";

const { handleError } = require("../utils/errorHandler");
const Reseña = require("../models/reseñas.model");

async function getReseñas() {
    try {
        const reseñas = await Reseña.find().exec();

        if (!reseñas) return [null, "No hay reseñas"];
        return [reseñas, null];
    } catch (error) {
        handleError(error, "reseñas.service -> getReseñas");
    }
}

async function getReseñaById(id) {
    try {
        const reseña = await Reseña.findById
        if (!reseña) return [null, "No existe la reseña"];
        return [reseña, null];
    }
    catch (error) {
        return [null, "Error al buscar la reseña"];
    }
}

async function createReseña(reseña) {
    try {
        const newReseña = new Reseña(reseña);
        const reseñaGuardada = await newReseña.save();
        return [reseñaGuardada, null];
    } catch (error) {
        handleError(error, "reseñas.service -> createReseña");
        return [null, "Error al crear la reseña"];
    }
}
async function updateReseña(id, reseña) {

    try {
        const reseñaActualizada = await Reseña.findByIdAndUpdate(id, reseña, { new: true }).exec();
        if (!reseñaActualizada) return [null, "No se encontró la reseña"];
        return [reseñaActualizada, null];
    }
    catch (error) {
        handleError(error, "reseñas.service -> updateReseña");
        return [null, "Error al actualizar la reseña"];
    }
}

async function deleteReseña(id) {
    try {
        const reseñaEliminada = await Reseña.findByIdAndDelete(id).exec();

        if (!reseñaEliminada) return [null, "No se encontró la reseña"];
        return [reseñaEliminada, null];
    } catch (error) {
        handleError(error, "reseñas.service -> deleteReseña");
        return [null, "Error al eliminar la reseña"];
    }
}

module.exports = {
    getReseñas,
    getReseñaById,
    createReseña,
    updateReseña,
    deleteReseña,
};