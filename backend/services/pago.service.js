"use strict";
const Pago = require('../models/pago.model');
const Pedido = require('../models/pedido.model');
const { handleError } = require('../utils/errorHandler');

async function createPago(pagoData) {
    try {
        // Validación de la existencia del pedido
        const pedido = await Pedido.findById(pagoData.pedidoId);
        if (!pedido) {
            throw new Error('El pedido especificado no existe.');
        }

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
        const pago = await Pago.findById(id).exec();
        if (!pago) return [null, "Pago no encontrado"];

        // Validación de la transición de estado
        const validTransitions = {
            "Completado": ["Reembolsado", "Cancelado"],
            "Reembolsado": [],
            "Cancelado": []
        };

        if (pagoData.estado && !validTransitions[pago.estado].includes(pagoData.estado)) {
            throw new Error(`Transición de estado no válida de ${pago.estado} a ${pagoData.estado}`);
        }

        Object.assign(pago, pagoData);
        await pago.save();

        return [pago, null];
    } catch (error) {
        handleError(error, "pago.service -> updatePago");
        return [null, error];
    }
}

async function getPagos() {
    try {
        const pagos = await Pago.find().exec();
        return [pagos, null];
    } catch (error) {
        handleError(error, "pago.service -> getPagos");
        return [null, error];
    }
}

async function cancelarPago(id) {
    try {
        const pago = await Pago.findById(id).exec();
        if (!pago) return [null, "Pago no encontrado"];

        if (pago.estado !== "Completado") {
            pago.estado = "Cancelado";
            await pago.save();
            return [pago, null];
        } else {
            throw new Error("No se puede cancelar un pago completado.");
        }
    } catch (error) {
        handleError(error, "pago.service -> cancelarPago");
        return [null, error];
    }
}

async function reembolsarPago(id) {
    try {
        const pago = await Pago.findById(id).exec();
        if (!pago) return [null, "Pago no encontrado"];

        if (pago.estado === "Completado") {
            pago.estado = "Reembolsado";
            await pago.save();
            return [pago, null];
        } else {
            throw new Error("Solo se pueden reembolsar pagos completados.");
        }
    } catch (error) {
        handleError(error, "pago.service -> reembolsarPago");
        return [null, error];
    }
}

module.exports = {
    createPago,
    getPagoById,
    updatePago,
    getPagos,
    cancelarPago,
    reembolsarPago,
};
