"use strict";
const { handleError } = require("../utils/errorHandler");
const IngredienteService = require("../services/ingredientes.service");
const { ingredienteBodySchema, ingredienteIdSchema } = require("../schema/ingredientes.schema");
const { respondSuccess, respondError } = require("../utils/resHandler");

async function getIngredientes(req, res) {
    try {
        const [ingredientes, errorIngredientes] = await IngredienteService.getIngredientes();

        if (errorIngredientes) return respondError(req, res, 404, errorIngredientes);
        ingredientes.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, ["Los ingredientes son: ", ingredientes]);
    } catch (error) {
        handleError(error, "ingrediente.controller -> getIngredientes");
    }
}

async function getIngredienteById(req, res) {
    try {
        const { id } = req.params;

        const [ingrediente, error] = await IngredienteService.getIngredienteById(id);

        if (!ingrediente) {
            return respondError(req, res, 404, "El ingrediente no existe");
        } else if (error){
            return respondError(req, res, 500, "Error interno del servidor");
        }
        respondSuccess(req, res, 200, ["El ingrediente es: ", ingrediente]);
    } catch (error) {
        handleError(error, "ingrediente.controller -> getIngredienteById");
        return respondError(req, res, 500, "Error interno del servidor");
    }
}

async function createIngrediente(req, res) {
    try {
        const ingredienteData = req.body;

        const { error: bodyError } = ingredienteBodySchema.validate(ingredienteData);
        if (bodyError) return respondError(req, res, 400, bodyError.message);
        const [newIngrediente, ingredienteError] = await IngredienteService.createIngrediente(ingredienteData);
        if (ingredienteError) return respondError(req, res, 400, ingredienteError);

        respondSuccess(req, res, 201, ["Ingrediente creado correctamente", newIngrediente]);
    } catch (error) {
        handleError(error, "ingrediente.controller -> createIngrediente");
        return respondError(req, res, 500, "Error interno del servidor");
    }
}

async function updateIngrediente(req, res) {
    try {
        const { id } = req.params;
        const ingrediente = req.body;
        const [ingredienteExistente, errorIngredienteExistente] = await IngredienteService.getIngredienteById(id);

        if (!ingredienteExistente) return respondError(req, res, 404, "El ingrediente no existe");
        const [ingredienteActualizado, errorIngredienteActualizado] = await IngredienteService.updateIngrediente(id, ingrediente);
        
        if (errorIngredienteActualizado) return respondError(req, res, 404, errorIngredienteActualizado);
        respondSuccess(req, res, 200, ["El ingrediente actualizado es: ", ingredienteActualizado]);
    } catch (error) {
        handleError(error, "ingrediente.controller -> updateIngrediente");
        return respondError(req, res, 500, "Error interno del servidor");
    }
}

async function deleteIngrediente(req, res) {
    try {
        const { id } = req.params;
        const [ingredienteExistente, errorIngredienteExistente] = await IngredienteService.getIngredienteById(id);

        if (!ingredienteExistente) return respondError(req, res, 404, "El ingrediente no existe");
        const [ingredienteEliminado, errorIngredienteEliminado] = await IngredienteService.deleteIngrediente(id);
        if (errorIngredienteEliminado) return respondError(req, res, 404, errorIngredienteEliminado);
        respondSuccess(req, res, 200, ["El ingrediente eliminado es: ", ingredienteEliminado]);
    } catch (error) {
        handleError(error, "ingrediente.controller -> deleteIngrediente");
    }
}

function handleMissingId(req, res) {
    respondError(req, res, 400, 'El ID es requerido en la ruta');
}

function handleId(req, res) {
    respondError(req, res, 400, 'No se debe proporcionar un ID en la ruta');
}

module.exports = {
    getIngredientes,
    getIngredienteById,
    createIngrediente,
    updateIngrediente,
    deleteIngrediente,
    handleMissingId,
    handleId,
};