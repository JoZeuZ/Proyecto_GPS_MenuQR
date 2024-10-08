"use strict";
const mesaService = require("../services/mesa.service");
const QRCode = require("qrcode");
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const { mesaBodySchema, mesaIdSchema } = require("../schema/mesa.schema");
const environment = require('../environment.js');

async function createMesa(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = mesaBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const { Nmesa, cantidadPersonas } = body;
        const qrData = `${environment.front}/?mesa=${Nmesa}`;
        const codigoQR = await QRCode.toDataURL(qrData);

        const mesaData = { Nmesa, codigoQR, cantidadPersonas };
        const [newMesa, error] = await mesaService.createMesa(mesaData);
        if (error) return respondError(req, res, 500, error.message);

        respondSuccess(req, res, 201, newMesa);
    } catch (error) {
        handleError(error, "mesa.controller -> createMesa");
        respondError(req, res, 500, error.message);
    }
}

async function getMesa(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = mesaIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [mesa, error] = await mesaService.getMesaById(params.id);
        if (error) return respondError(req, res, 500, error.message);
        if (!mesa) return respondError(req, res, 404, "Mesa no encontrada");

        respondSuccess(req, res, 200, mesa);
    } catch (error) {
        handleError(error, "mesa.controller -> getMesa");
        respondError(req, res, 500, error.message);
    }
}


async function updateMesa(req, res) {
    try {
        const { params, body } = req;
        const { error: paramsError } = mesaIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const { error: bodyError } = mesaBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const qrData = `${environment.front}/?mesa=${body.Nmesa}`;
        const codigoQR = await QRCode.toDataURL(qrData);
        body.codigoQR = codigoQR;

        const [mesa, error] = await mesaService.updateMesa(params.id, body);
        if (error) return respondError(req, res, 500, error.message);
        if (!mesa) return respondError(req, res, 404, "Mesa no encontrada");

        respondSuccess(req, res, 200, mesa);
    } catch (error) {
        handleError(error, "mesa.controller -> updateMesa");
        respondError(req, res, 500, error.message);
    }
}

async function getMesas(req, res) {
    try {
        const [mesas, error] = await mesaService.getMesas();
        if (error) return respondError(req, res, 500, error.message);

        respondSuccess(req, res, 200, mesas);
    } catch (error) {
        handleError(error, "mesa.controller -> getMesas");
        respondError(req, res, 500, error.message);
    }
}

async function deleteMesa(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = mesaIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [mesa, error] = await mesaService.deleteMesa(params.id);
        if (error) return respondError(req, res, 500, error.message);
        if (!mesa) return respondError(req, res, 404, "Mesa no encontrada");

        respondSuccess(req, res, 200, mesa);
    } catch (error) {
        handleError(error, "mesa.controller -> deleteMesa");
        respondError(req, res, 500, error.message);
    }
}



// async function deleteMesasByNumMesas(req, res) {
//     try {
//         const { body } = req;

//         const { Nmesas } = body;
//         const [mesas, error] = await mesaService.deleteMesasByNumMesas(Nmesas);
//         if (error) return respondError(req, res, 500, error.message);

//         respondSuccess(req, res, 200, mesas);
//     } catch (error) {
//         handleError(error, "mesa.controller -> deleteMesasByNumMesas");
//         respondError(req, res, 500, error.message);
//     }
// }

async function deleteMesaByNumMesa(req, res) {
    try {
        const { params } = req;

        const [mesa, error] = await mesaService.deleteMesaByNumMesa(params.Nmesa);
        if (error) return respondError(req, res, 500, error.message);
        if (!mesa) return respondError(req, res, 404, "Mesa no encontrada");

        respondSuccess(req, res, 200, mesa);
    } catch (error) {
        handleError(error, "mesa.controller -> deleteMesaByNumMesa");
        respondError(req, res, 500, error.message);
    }
}

async function getMesaByNumber(req, res) {
    try {
        const { Nmesa } = req.params;
        const [mesa, error] = await mesaService.getMesaByNumber(Nmesa);
        if (error) return respondError(req, res, 500, error.message);
        if (!mesa) return respondError(req, res, 404, "Mesa no encontrada");

        respondSuccess(req, res, 200, mesa);
    } catch (error) {
        handleError(error, "mesa.controller -> getMesaByNumber");
        respondError(req, res, 500, error.message);
    }
}

module.exports = {
    createMesa,
    getMesa,
    updateMesa,
    getMesas,
    deleteMesa,
    deleteMesaByNumMesa,
    getMesaByNumber,
};
