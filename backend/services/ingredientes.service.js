const Ingrediente = require('../models/ingredientes.model');
const {handleError} = require('../utils/errorHandler');

async function getIngredientes() {
    try {
        const ingredientes = await Ingrediente.find()
            .exec();
        if (!ingredientes) return [null, "No hay ingredientes"];

        return [ingredientes, null];
    } catch (error) {
        handleError(error, "ingredientes.service -> getIngredientes");
    }
}

async function getIngredienteById(id) {
    try {
        const ingrediente = await Ingrediente.findById(id)
            .exec();
        if (!ingrediente) return [null, "No se encontró el ingrediente"];
        return [ingrediente, null];
    }
    catch (error) {
        handleError(error, "ingredientes.service -> getIngredienteById");
    }
}

async function createIngrediente(ingrediente) {
    try {
        const newIngrediente = new Ingrediente(ingrediente);
        const ingredienteGuardado = await newIngrediente.save();
        return [ingredienteGuardado, null];
    } catch (error) {
        handleError(error, "ingredientes.service -> createIngrediente");
    }
}

async function updateIngrediente(id, ingrediente) {
    try {
        const ingredienteActualizado = await Ingrediente.findByIdAndUpdate(id, ingrediente, { new: true })
            .exec();
        if (!ingredienteActualizado) return [null, "No se encontró el ingrediente"];
        return [ingredienteActualizado, null];
    } catch (error) {
        handleError(error, "ingredientes.service -> updateIngrediente");
    }
}

async function deleteIngrediente(id) {
    try {
        const ingredienteEliminado = await Ingrediente.findByIdAndDelete(id)
            .exec();
        if (!ingredienteEliminado) return [null, "No se encontró el ingrediente"];
        return [ingredienteEliminado, null];
    } catch (error) {
        handleError(error, "ingredientes.service -> deleteIngrediente");
    }
}

// module.exports = router;
module.exports = {
    getIngredientes,
    getIngredienteById,
    createIngrediente,
    updateIngrediente,
    deleteIngrediente,
};