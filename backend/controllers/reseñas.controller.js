"use strict";

const { handleError } = require("../utils/errorHandler");
const ReseñaService = require("../services/reseñas.service");
const { reseñaBodySchema, reseñaIdSchema } = require("../schema/reseñas.schema");
const { respondSuccess, respondError } = require("../utils/resHandler");

async function getReseñas(req, res) {
    try {
        const [reseñas, errorReseñas] = await ReseñaService.getReseñas();

        if (errorReseñas) return respondError(req, res, 404, errorReseñas);
        reseñas.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, ["Las reseñas son: ", reseñas]);
    } catch (error) {
        handleError(error, "reseña.controller -> getReseñas");
    }
}

async function getReseñaById(req, res) {
    try {
        const { id } = req.params;

        const [reseña, error] = await ReseñaService.getReseñaById(id);

        if (!reseña) {
            return respondError(req, res, 404, "La reseña no existe");
        } else if (error){
            return respondError(req, res, 500, "Error interno del servidor");
        }
        respondSuccess(req, res, 200, ["La reseña es: ", reseña]);
    } catch (error) {
        handleError(error, "reseña.controller -> getReseñaById");
        return respondError(req, res, 500, "Error interno del servidor");
    }
}

async function createReseña(req, res) {
    try {
        const reseñaData = req.body;

        const { error: bodyError } = reseñaBodySchema.validate(reseñaData);
        if (bodyError) return respondError(req, res, 400, bodyError.message);
        const [newReseña, reseñaError] = await ReseñaService.createReseña(reseñaData);
        if (reseñaError) return respondError(req, res, 400, reseñaError);

        respondSuccess(req, res, 201, ["Reseña creada correctamente", newReseña]);
    } catch (error) {
        handleError(error, "reseña.controller -> createReseña");
        return respondError(req, res, 500, "Error interno del servidor");
    }
}

async function updateReseña(req, res) {
    try {
        const { id } = req.params;
        const reseña = req.body;
        const [reseñaExistente, errorReseñaExistente] = await ReseñaService.getReseñaById(id);

        if (!reseñaExistente) return respondError(req, res, 404, "La reseña no existe");
        const [updatedReseña, error] = await ReseñaService.updateReseña(id, reseña);
        if (error) return respondError(req, res, 400, error);

        respondSuccess(req, res, 200, ["Reseña actualizada correctamente", updatedReseña]);
    } catch (error) {
        handleError(error, "reseña.controller -> updateReseña");
        return respondError(req, res, 500, "Error interno del servidor");
    }
}

async function deleteReseña(req, res) {
    try {
        const { id } = req.params;
        const [deletedReseña, error] = await ReseñaService.deleteReseña(id);

        if (error) return respondError(req, res, 404, error);
        respondSuccess(req, res, 200, ["Reseña eliminada correctamente", deletedReseña]);
    } catch (error) {
        handleError(error, "reseña.controller -> deleteReseña");
        return respondError(req, res, 500, "Error interno del servidor");
    }
}

module.exports = {
    getReseñas,
    getReseñaById,
    createReseña,
    updateReseña,
    deleteReseña,
};

