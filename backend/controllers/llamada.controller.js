"use strict";

const { notifyWaiterCall } = require('../config/websocket');
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const { callWaiterSchema } = require("../schema/llamada.schema");


async function callWaiter(req, res) {
    try {
        const { tableNumber, customerName } = req.body;

        const { error } = callWaiterSchema.validate({ tableNumber, customerName });
        if (error) return respondError(req, res, 400, error.details[0].message);

        const call = { tableNumber, customerName, time: new Date() };
        notifyWaiterCall(call);

        return respondSuccess(req, res, 200, ["Waiter called successfully", call]);
    } catch (err) {
        handleError(err, "llamada.controller -> callWaiter");
        return respondError(req, res, 500, "Error interno del servidor");
    }
}

// Controlador para obtener todas las llamadas al mesero (solo para debugging, puedes eliminarlo en producción)
async function getWaiterCalls(req, res) {
    try {
        // Supongamos que `waiterCalls` es una lista en memoria para almacenar las llamadas (solo para debugging)
        return respondSuccess(req, res, 200, ["Calls", waiterCalls]);
    } catch (err) {
        handleError(err, "llamada.controller -> getWaiterCalls");
        return respondError(req, res, 500, "Error interno del servidor");
    }
}

module.exports = {
    callWaiter,
    getWaiterCalls
};
