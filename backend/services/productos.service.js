"use strict";
const Producto = require('../models/productos.model');
const {handleError} = require('../utils/errorHandler');

async function getProductos() {
    try {
        const productos = await Producto.find().exec();

        if (!productos) return [null, "No hay productos"];
        return [productos, null];
    } catch (error) {
        handleError(error, "productos.service -> getProductos");
    }
}

async function createProducto(producto) {
    try {
        const {nombre, precio, descripcion, categoria, img, ingredientes} = producto;
        let productoFound = await Producto.findOne({nombre});

        if (productoFound) return [null, "Ya existe un producto registrado con ese nombre"];
        const newProducto = new Producto({
            nombre,
            precio,
            descripcion,
            categoria,
            img,
            ingredientes
        });
        await newProducto.save();
        return [newProducto, null];
    } catch (error) {
        handleError(error, "productos.service -> createProducto");
        return [null, error];
    }
}

module.exports = {
    getProductos,
    createProducto,
};