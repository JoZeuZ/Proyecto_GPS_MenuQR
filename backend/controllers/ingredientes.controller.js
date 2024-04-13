const IngredienteService = require("../services/ingredientes.service");
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");


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
        const [ingrediente, errorIngrediente] = await IngredienteService.getIngredienteById(id);
        if (errorIngrediente) return respondError(req, res, 404, errorIngrediente);

        respondSuccess(req, res, 200, ["El ingrediente es: ", ingrediente]);
    } catch (error) {
        handleError(error, "ingrediente.controller -> getIngredienteById");
    }
}

async function createIngrediente(req, res) {
    try {
        const ingrediente = req.body;
        const [ingredienteGuardado, errorIngredienteGuardado] = await IngredienteService.createIngrediente(ingrediente);
        if (errorIngredienteGuardado) return respondError(req, res, 404, errorIngredienteGuardado);

        respondSuccess(req, res, 201, ["El ingrediente creado es: ", ingredienteGuardado]);
    } catch (error) {
        handleError(error, "ingrediente.controller -> createIngrediente");
    }
}

async function updateIngrediente(req, res) {
    try {
        const { id } = req.params;
        const ingrediente = req.body;
        const [ingredienteActualizado, errorIngredienteActualizado] = await IngredienteService.updateIngrediente(id, ingrediente);
        if (errorIngredienteActualizado) return respondError(req, res, 404, errorIngredienteActualizado);

        respondSuccess(req, res, 200, ["El ingrediente actualizado es: ", ingredienteActualizado]);
    } catch (error) {
        handleError(error, "ingrediente.controller -> updateIngrediente");
    }
}

async function deleteIngrediente(req, res) {
    try {
        const { id } = req.params;
        const [ingredienteEliminado, errorIngredienteEliminado] = await IngredienteService.deleteIngrediente(id);
        if (errorIngredienteEliminado) return respondError(req, res, 404, errorIngredienteEliminado);

        respondSuccess(req, res, 200, ["El ingrediente eliminado es: ", ingredienteEliminado]);
    } catch (error) {
        handleError(error, "ingrediente.controller -> deleteIngrediente");
    }
}


module.exports = {
    getIngredientes,
    getIngredienteById,
    createIngrediente,
    updateIngrediente,
    deleteIngrediente,
};