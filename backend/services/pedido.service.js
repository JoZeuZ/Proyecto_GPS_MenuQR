"use strict";
const Pedido = require('../models/pedido.model');
const { handleError } = require('../utils/errorHandler');

async function createPedido(pedidoData) {
    try {
        const newPedido = new Pedido(pedidoData);
        await newPedido.save();
        return [newPedido, null];
    } catch (error) {
        handleError(error, "pedido.service -> createPedido");
        return [null, error];
    }
}

async function getPedidoById(id) {
    try {
        const pedido = await Pedido.findById(id).populate('productos.productoId').exec();
        if (!pedido) return [null, "Pedido no encontrado"];
        return [pedido, null];
    } catch (error) {
        handleError(error, "pedido.service -> getPedidoById");
        return [null, error];
    }
}

async function updatePedido(id, pedidoData) {
    try {
        const pedido = await Pedido.findByIdAndUpdate(id, pedidoData, { new: true }).exec();
        if (!pedido) return [null, "Pedido no encontrado"];
        return [pedido, null];
    } catch (error) {
        handleError(error, "pedido.service -> updatePedido");
        return [null, error];
    }
}

async function getPedidos() {
    try {
        const pedidos = await Pedido.find().populate('productos.productoId').exec();
        return [pedidos, null];
    } catch (error) {
        handleError(error, "pedido.service -> getPedidos");
        return [null, error];
    }
}

async function getPedidosByMesaId(mesaId) {
    try {
        const pedidos = await Pedido.find({ mesa: mesaId }).populate('productos.productoId').exec();
        return [pedidos, null];
    } catch (error) {
        handleError(error, "pedido.service -> getPedidosByMesaId");
        return [null, error];
    }
}

async function deletePedido(id) {
    try {
        const pedido = await Pedido.findByIdAndDelete(id).exec();
        if (!pedido) return [null, "Pedido no encontrado"];
        return [pedido, null];
    } catch (error) {
        handleError(error, "pedido.service -> deletePedido");
        return [null, error];
    }
}

module.exports = {
    createPedido,
    getPedidoById,
    updatePedido,
    getPedidos,
    getPedidosByMesaId,
    deletePedido,
};
