"use strict";
const Producto = require('../models/productos.model');
const {handleError} = require('../utils/errorHandler');

async function getProductos() {
    try {
        const productos = await Producto.find().populate('ingredientes').exec();

        if (!productos) return [null, "No hay productos"];
        return [productos, null];
    } catch (error) {
        handleError(error, "productos.service -> getProductos");
    }
}

async function getProductobyId(id) {
    try {
        const producto = await Producto
            .findById(id)
            .populate('ingredientes')
            .exec();

        if (!producto) return [null, "No se encontró el producto"];
        return [producto, null];
    } catch (error) {
        handleError(error, "productos.service -> getProductobyId");
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

async function updateProducto(id, producto) {
    try {
        const {nombre, precio, descripcion, categoria, img, ingredientes} = producto;
        let productoFound = await Producto.findById(id);

        if (!nombre || typeof nombre !== "string")
            return [null, "El nombre del producto es requerido"];
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

        if (!productoFound) 
            return [null, "No se encontró el producto"];

        productoFound.nombre = nombre;
        productoFound.precio = precio;
        productoFound.descripcion = descripcion;
        productoFound.categoria = categoria;
        productoFound.img = img;
        productoFound.ingredientes = ingredientes;

        await productoFound.save();
        return [productoFound, null];
    } catch (error) {
        handleError(error, "productos.service -> updateProducto");
    }
}

async function deleteProducto(id) {
    try {
        const producto = await Producto.findByIdAndDelete(id).exec();

        if (!producto) return [null, "No se encontró el producto"];
        return [producto, null];
    } catch (error) {
        handleError(error, "productos.service -> deleteProducto");
    }
}

module.exports = {
    getProductos,
    getProductobyId,
    createProducto,
    updateProducto,
    deleteProducto,
};