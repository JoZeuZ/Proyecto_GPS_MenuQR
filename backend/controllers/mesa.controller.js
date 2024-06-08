"use strict";
const Mesa = require("../models/mesa.model");
const QRCode = require("qrcode");
const { respondSuccess, respondError } = require("../utils/resHandler");

async function createMesa(req, res) {
    try {
        const { Nmesa, cantidadPersonas } = req.body;
        const qrData = `https://mi-restaurante.com/pedido?mesa=${Nmesa}`;
        const codigoQR = await QRCode.toDataURL(qrData);

        const newMesa = new Mesa({ Nmesa, codigoQR, cantidadPersonas });
        await newMesa.save();

        respondSuccess(req, res, 201, newMesa);
    } catch (error) {
        respondError(req, res, 500, error.message);
    }
}

async function getMesa(req, res) {
    try {
        const mesa = await Mesa.findById(req.params.id);
        if (!mesa) return respondError(req, res, 404, "Mesa no encontrada");
        respondSuccess(req, res, 200, mesa);
    } catch (error) {
        respondError(req, res, 500, error.message);
    }
}

module.exports = {
    createMesa,
    getMesa
};
