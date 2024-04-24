"use strict";
const PlatoService = require("../services/platos.service");
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

async function getPlatos(req, res) {
    try {
        const [platos, errorPlatos] = await PlatoService.getPlatos();

        if (errorPlatos) return respondError(req, res, 404, errorPlatos);
        platos.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, ["Los platos son: ", platos]);
    } catch (error) {
        handleError(error, "plato.controller -> getPlatos");
    }
}

async function createPlato(req, res) {
    try {
        const { nombre, precio, descripcion, categoria, img, ingredientes } = req.body;

        if (!nombre || !precio || !descripcion || !categoria || !img || !ingredientes) {
            return respondError(req, res, 400, "Faltan datos");
        }
        const [newPlato, errorPlato] = await PlatoService.createPlato({ nombre, precio, descripcion, categoria, img, ingredientes});
        if (errorPlato) return respondError(req, res, 400, errorPlato);
        respondSuccess(req, res, 201, ["Plato creado: ", newPlato]);
    } catch (error) {
        handleError(error, "plato.controller -> createPlato");
    }
}


module.exports = {
    getPlatos,
    createPlato,
};