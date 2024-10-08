"use strict";
const pagoService = require("../services/pago.service");
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const { pagoBodySchema, pagoIdSchema } = require("../schema/pago.schema");

async function createPago(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = pagoBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [newPago, error] = await pagoService.createPago(body);
        if (error) return respondError(req, res, 500, error.message);

        respondSuccess(req, res, 201, newPago);
    } catch (error) {
        handleError(error, "pago.controller -> createPago");
        respondError(req, res, 500, error.message);
    }
}

async function getPago(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = pagoIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [pago, error] = await pagoService.getPagoById(params.id);
        if (error) return respondError(req, res, 500, error.message);
        if (!pago) return respondError(req, res, 404, "Pago no encontrado");

        respondSuccess(req, res, 200, pago);
    } catch (error) {
        handleError(error, "pago.controller -> getPago");
        respondError(req, res, 500, error.message);
    }
}

async function updatePago(req, res) {
    try {
        const { params, body } = req;
        const { error: paramsError } = pagoIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const { error: bodyError } = pagoBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [pago, error] = await pagoService.updatePago(params.id, body);
        if (error) return respondError(req, res, 500, error.message);
        if (!pago) return respondError(req, res, 404, "Pago no encontrado");

        respondSuccess(req, res, 200, pago);
    } catch (error) {
        handleError(error, "pago.controller -> updatePago");
        respondError(req, res, 500, error.message);
    }
}

async function cancelPago(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = pagoIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [pago, error] = await pagoService.cancelarPago(params.id);
        if (error) return respondError(req, res, 500, error.message);
        if (!pago) return respondError(req, res, 404, "Pago no encontrado");

        respondSuccess(req, res, 200, pago);
    } catch (error) {
        handleError(error, "pago.controller -> cancelPago");
        respondError(req, res, 500, error.message);
    }
}

async function reembolsarPago(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = pagoIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [pago, error] = await pagoService.reembolsarPago(params.id);
        if (error) return respondError(req, res, 500, error.message);
        if (!pago) return respondError(req, res, 404, "Pago no encontrado");

        respondSuccess(req, res, 200, pago);
    } catch (error) {
        handleError(error, "pago.controller -> reembolsarPago");
        respondError(req, res, 500, error.message);
    }
}

async function getPagos(req, res) {
    try {
        const [pagos, error] = await pagoService.getPagos();
        if (error) return respondError(req, res, 500, error.message);

        respondSuccess(req, res, 200, pagos);
    } catch (error) {
        handleError(error, "pago.controller -> getPagos");
        respondError(req, res, 500, error.message);
    }
}

module.exports = {
    createPago,
    getPago,
    updatePago,
    cancelPago,
    reembolsarPago,
    getPagos,
};
