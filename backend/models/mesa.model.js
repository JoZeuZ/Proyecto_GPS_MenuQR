"use strict";
const { model, Schema } = require('mongoose');

const mesaSchema = new Schema({
    Nmesa: {
        type: Number,
        required: true,
        unique: true
    },
    codigoQR: {
        type: String,
    },
    cantidadPersonas: {
        type: Number,
        required: true
    }
});

module.exports = model('Mesa', mesaSchema);
