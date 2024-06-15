"use strict";
const pedidoService = require("../services/pedido.service");
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const { pedidoBodySchema, pedidoIdSchema } = require("../schema/pedido.schema");

async function createPedido(req, res) {
    try {
        const { body, params } = req;
        const { mesaId } = params;

        // Añadir el id de la mesa al cuerpo del pedido
        const pedidoData = {
            ...body,
            mesa: mesaId,
        };

        const { error: bodyError } = pedidoBodySchema.validate(pedidoData);
        if (bodyError) return respondError(req, res, 400, bodyError.message);
        const [newPedido, error] = await pedidoService.createPedido(pedidoData);
        if (error) return respondError(req, res, 500, error.message);

        respondSuccess(req, res, 201, newPedido);
    } catch (error) {
        handleError(error, "pedido.controller -> createPedido");
        respondError(req, res, 500, error.message);
    }
}

async function getPedido(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = pedidoIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [pedido, error] = await pedidoService.getPedidoById(params.id);
        if (error) return respondError(req, res, 500, error.message);
        if (!pedido) return respondError(req, res, 404, "Pedido no encontrado");

        respondSuccess(req, res, 200, pedido);
    } catch (error) {
        handleError(error, "pedido.controller -> getPedido");
        respondError(req, res, 500, error.message);
    }
}

async function updatePedido(req, res) {
    try {
        const { params, body } = req;
        const { error: paramsError } = pedidoIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const { error: bodyError } = pedidoBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [pedido, error] = await pedidoService.updatePedido(params.id, body);
        if (error) return respondError(req, res, 500, error.message);
        if (!pedido) return respondError(req, res, 404, "Pedido no encontrado");

        respondSuccess(req, res, 200, pedido);
    } catch (error) {
        handleError(error, "pedido.controller -> updatePedido");
        respondError(req, res, 500, error.message);
    }
}

async function getPedidos(req, res) {
    try {
        const [pedidos, error] = await pedidoService.getPedidos();
        if (error) return respondError(req, res, 500, error.message);

        respondSuccess(req, res, 200, pedidos);
    } catch (error) {
        handleError(error, "pedido.controller -> getPedidos");
        respondError(req, res, 500, error.message);
    }
}

async function getPedidosByMesaId(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = pedidoIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [pedidos, error] = await pedidoService.getPedidosByMesaId(params.mesaId);
        if (error) return respondError(req, res, 500, error.message);

        respondSuccess(req, res, 200, pedidos);
    } catch (error) {
        handleError(error, "pedido.controller -> getPedidosByMesaId");
        respondError(req, res, 500, error.message);
    }
}

async function deletePedido(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = pedidoIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [pedido, error] = await pedidoService.deletePedido(params.id);
        if (error) return respondError(req, res, 500, error.message);
        if (!pedido) return respondError(req, res, 404, "Pedido no encontrado");

        respondSuccess(req, res, 200, pedido);
    } catch (error) {
        handleError(error, "pedido.controller -> deletePedido");
        respondError(req, res, 500, error.message);
    }
}

module.exports = {
    createPedido,
    getPedido,
    updatePedido,
    getPedidos,
    getPedidosByMesaId,
    deletePedido,
};
