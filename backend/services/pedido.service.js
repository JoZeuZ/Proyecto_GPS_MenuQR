"use strict";
const Pedido = require('../models/pedido.model');
const Mesa = require('../models/mesa.model');
const Productos = require('../models/productos.model');
const { handleError } = require('../utils/errorHandler');

async function createPedido(pedidoData) {
    try {
        // Validación de la existencia de la mesa
        const mesa = await Mesa.findById(pedidoData.mesa);
        if (!mesa) {
            throw new Error('La mesa especificada no existe.');
        }

        // Validación de la existencia de productos y cálculo del total
        let total = 0;
        for (const item of pedidoData.productos) {
            const producto = await Productos.findById(item.productoId);
            if (!producto) {
                throw new Error(`El producto con ID ${item.productoId} no existe.`);
            }
            total += producto.precio * item.cantidad;
        }

        pedidoData.total = total;
        if (typeof pedidoData.propina === 'undefined') {
            pedidoData.propina = 0;
        }

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
        const pedido = await Pedido.findById(id).populate('mesa').populate('productos.productoId').exec();
        if (!pedido) return [null, "Pedido no encontrado"];
        return [pedido, null];
    } catch (error) {
        handleError(error, "pedido.service -> getPedidoById");
        return [null, error];
    }
}

async function updatePedido(id, pedidoData) {
    try {
        const pedido = await Pedido.findById(id).exec();
        if (!pedido) return [null, "Pedido no encontrado"];
        
        // Validación de la transición de estado
        const validTransitions = {
            "Pendiente": ["Preparación", "Completado", "Entregado"],
            "Preparación": ["Completado", "Entregado"],
            "Completado": ["Entregado"],
            "Entregado": []
        };

        if (pedidoData.estado && !validTransitions[pedido.estado].includes(pedidoData.estado)) {
            throw new Error(`Transición de estado no válida de ${pedido.estado} a ${pedidoData.estado}`);
        }

        // Actualización del total y propina si los productos cambian
        if (pedidoData.productos) {
            let total = 0;
            for (const item of pedidoData.productos) {
                const producto = await Productos.findById(item.productoId);
                if (!producto) {
                    throw new Error(`El producto con ID ${item.productoId} no existe.`);
                }
                total += producto.precio * item.cantidad;
            }
            pedidoData.total = total;
        }

        if (typeof pedidoData.propina === 'undefined') {
            pedidoData.propina = 0;
        }

        Object.assign(pedido, pedidoData);
        await pedido.save();

        return [pedido, null];
    } catch (error) {
        handleError(error, "pedido.service -> updatePedido");
        return [null, error];
    }
}


async function getPedidos() {
    try {
        const pedidos = await Pedido.find().populate('mesa').populate('productos.productoId').exec();
        return [pedidos, null];
    } catch (error) {
        handleError(error, "pedido.service -> getPedidos");
        return [null, error];
    }
}

async function getPedidosByMesaId(mesaId) {
    try {
        const pedidos = await Pedido.find({ mesa: mesaId }).populate('mesa').populate('productos.productoId').exec();
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
