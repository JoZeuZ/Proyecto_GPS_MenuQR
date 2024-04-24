"use strict";
const Plato = require('../models/platos.model');
const {handleError} = require('../utils/errorHandler');

async function getPlatos() {
    try {
        const platos = await Plato.find().exec();

        if (!platos) return [null, "No hay platos"];
        return [platos, null];
    } catch (error) {
        handleError(error, "platos.service -> getPlatos");
    }
}

async function createPlato(plato) {
    try {
        const {nombre, precio, descripcion, categoria, img, ingredientes} = plato;
        let platoFound = await Plato.findOne({nombre});

        if (platoFound) return [null, "Ya existe un plato registrado con ese nombre"];
        const newPlato = new Plato({
            nombre,
            precio,
            descripcion,
            categoria,
            img,
            ingredientes
        });
        await newPlato.save();
        return [newPlato, null];
    } catch (error) {
        handleError(error, "platos.service -> createPlato");
        return [null, error];
    }
}

module.exports = {
    getPlatos,
    createPlato,
};