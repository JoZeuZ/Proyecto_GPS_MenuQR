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

        if (!nombre || typeof nombre !== "string"){
            return [null, "El nombre del producto es requerido"];}
        if (!precio || typeof precio !== "number" || precio <= 0)
            return [null, "El precio del producto es requerido"];
        if (!descripcion || typeof descripcion !== "string")
            return [null, "La descripción del producto es requerida"];
        if (!categoria || typeof categoria !== "string")
            return [null, "La categoría del producto es requerida"];
        if (!img || typeof img !== "string")
            return [null, "La imagen del producto es requerida"];
        if (!ingredientes || !Array.isArray(ingredientes) || ingredientes.length === 0)
            return [null, "Los ingredientes del producto son requeridos"];

        if (productoFound) 
            return [null, "Ya existe un producto registrado con ese nombre"];

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