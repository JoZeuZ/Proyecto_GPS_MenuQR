"use strict";
const ProductoService = require("../services/productos.service");
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

async function getProductos(req, res) {
    try {
        const [productos, errorProductos] = await ProductoService.getProductos();

        if (errorProductos) return respondError(req, res, 404, errorProductos);
        productos.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, ["Los productos son: ", productos]);
    } catch (error) {
        handleError(error, "producto.controller -> getProductos");
    }
}

async function createProducto(req, res) {
    try {
        const { nombre, precio, descripcion, categoria, img, ingredientes } = req.body;

        if (!nombre || !precio || !descripcion || !categoria || !img || !ingredientes) {
            return respondError(req, res, 400, "Faltan datos");
        }
        const [newProducto, errorProducto] = await ProductoService.createProducto({ nombre, precio, descripcion, categoria, img, ingredientes});
        if (errorProducto) return respondError(req, res, 400, errorProducto);
        respondSuccess(req, res, 201, ["Producto creado: ", newProducto]);
    } catch (error) {
        handleError(error, "producto.controller -> createProducto");
    }
}

async function updateProducto(req, res) {
    try {
        const { id } = req.params;
        const { nombre, precio, descripcion, categoria, img, ingredientes } = req.body;

        if (!nombre || !precio || !descripcion || !categoria || !ingredientes) {
            return respondError(req, res, 400, "Faltan datos");
        }
        const [updatedProducto, errorProducto] = await ProductoService.updateProducto(id, { nombre, precio, descripcion, categoria, img, ingredientes });
        if (errorProducto) return respondError(req, res, 400, errorProducto);
        respondSuccess(req, res, 200, ["Producto actualizado: ", updatedProducto]);
    } catch (error) {
        handleError(error, "producto.controller -> updateProducto");
    }
}       

async function deleteProducto(req, res) {
    try {
        const { id } = req.params;
        const [deletedProducto, errorProducto] = await ProductoService.deleteProducto(id);
        if (errorProducto) return respondError(req, res, 400, errorProducto);
        respondSuccess(req, res, 200, ["Producto eliminado: ", deletedProducto]);
    } catch (error) {
        handleError(error, "producto.controller -> deleteProducto");
    }
}

async function getProductoById(req, res) {
    try {
        const { id } = req.params;
        const [producto, errorProducto] = await ProductoService.getProductoById(id);
        if (errorProducto) return respondError(req, res, 404, errorProducto);
        respondSuccess(req, res, 200, ["Producto: ", producto]);
    } catch (error) {
        handleError(error, "producto.controller -> getProductoById");
    }
}


module.exports = {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
};