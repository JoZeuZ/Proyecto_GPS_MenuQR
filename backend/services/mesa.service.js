"use strict";
const Mesa = require('../models/mesa.model');
const { handleError } = require('../utils/errorHandler');

async function createMesa(mesaData) {
    try {
        // Validación de la existencia de la mesa
        const existingMesa = await Mesa.findOne({ Nmesa: mesaData.Nmesa });
        if (existingMesa) {
            throw new Error('La mesa especificada ya existe.');
        }

        const newMesa = new Mesa(mesaData);
        await newMesa.save();
        return [newMesa, null];
    } catch (error) {
        handleError(error, "mesa.service -> createMesa");
        return [null, error];
    }
}


async function getMesaById(id) {
    try {
        const mesa = await Mesa.findById(id).exec();
        if (!mesa) return [null, "Mesa no encontrada"];
        return [mesa, null];
    } catch (error) {
        handleError(error, "mesa.service -> getMesaById");
        return [null, error];
    }
}

async function updateMesa(id, mesaData) {
    try {
        const existingMesa = await Mesa.findOne({ Nmesa: mesaData.Nmesa, _id: { $ne: id } });
        if (existingMesa) {
            throw new Error('El número de mesa ya está en uso por otra mesa.');
        }

        const mesa = await Mesa.findByIdAndUpdate(id, mesaData, { new: true }).exec();
        if (!mesa) return [null, "Mesa no encontrada"];
        return [mesa, null];
    } catch (error) {
        handleError(error, "mesa.service -> updateMesa");
        return [null, error];
    }
}


async function getMesas() {
    try {
        const mesas = await Mesa.find().exec();
        return [mesas, null];
    } catch (error) {
        handleError(error, "mesa.service -> getMesas");
        return [null, error];
    }
}

async function deleteMesa(id) {
    try {
        const mesa = await Mesa.findByIdAndDelete(id).exec();
        if (!mesa) return [null, "Mesa no encontrada"];
        return [mesa, null];
    } catch (error) {
        handleError(error, "mesa.service -> deleteMesa");
        return [null, error];
    }
}



async function deleteMesaByNumMesa(Nmesa){
    try {
        const mesa = await Mesa.findOneAndDelete({ Nmesa: Nmesa }).exec();
        if (!mesa) return [null, "Mesa no encontrada"];
        return [mesa, null];
    } catch (error) {
        handleError(error, "mesa.service -> deleteMesaByNumMesa");
        return [null, error];
    }
}


module.exports = {
    createMesa,
    getMesaById,
    updateMesa,
    getMesas,
    deleteMesa,
    deleteMesaByNumMesa,
};
