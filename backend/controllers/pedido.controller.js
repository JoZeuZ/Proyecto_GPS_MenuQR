"use strict";
const Pedido = require("../models/pedido.model");
const Mesa = require("../models/mesa.model");
const { respondSuccess, respondError } = require("../utils/resHandler");

async function createPedido(req, res) {
    try {
        const { cliente, productos, total, propina, metodoPago } = req.body;
        const { mesaId } = req.query;

        const mesa = await Mesa.findById(mesaId);
        if (!mesa) {
            return respondError(req, res, 404, "Mesa no encontrada");
        }

        const newPedido = new Pedido({ cliente, mesa: mesa._id, productos, total, propina, metodoPago });
        await newPedido.save();

        respondSuccess(req, res, 201, newPedido);
    } catch (error) {
        respondError(req, res, 500, error.message);
    }
}

async function getPedido(req, res) {
    try {
        const pedido = await Pedido.findById(req.params.id).populate('productos.productoId');
        if (!pedido) return respondError(req, res, 404, "Pedido no encontrado");
        respondSuccess(req, res, 200, pedido);
    } catch (error) {
        respondError(req, res, 500, error.message);
    }
}

async function updatePedido(req, res) {
    try {
        const { estado } = req.body;
        const pedido = await Pedido.findByIdAndUpdate(req.params.id, { estado }, { new: true });
        if (!pedido) return respondError(req, res, 404, "Pedido no encontrado");
        respondSuccess(req, res, 200, pedido);
    } catch (error) {
        respondError(req, res, 500, error.message);
    }
}

module.exports = {
    createPedido,
    getPedido,
    updatePedido
};
