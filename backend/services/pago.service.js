"use strict";
const Pago = require('../models/pago.model');
const { handleError } = require('../utils/errorHandler');

async function createPago(pagoData) {
    try {
        const newPago = new Pago(pagoData);
        await newPago.save();
        return [newPago, null];
    } catch (error) {
        handleError(error, "pago.service -> createPago");
        return [null, error];
    }
}

async function getPagoById(id) {
    try {
        const pago = await Pago.findById(id).exec();
        if (!pago) return [null, "Pago no encontrado"];
        return [pago, null];
    } catch (error) {
        handleError(error, "pago.service -> getPagoById");
        return [null, error];
    }
}

async function updatePago(id, pagoData) {
    try {
        const pago = await Pago.findByIdAndUpdate(id, pagoData, { new: true }).exec();
        if (!pago) return [null, "Pago no encontrado"];
        return [pago, null];
    } catch (error) {
        handleError(error, "pago.service -> updatePago");
        return [null, error];
    }
}

module.exports = {
    createPago,
    getPagoById,
    updatePago,
};
