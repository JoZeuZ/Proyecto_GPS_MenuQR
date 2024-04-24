"use strict";
const { model, Schema } = require('mongoose');

const ingredienteSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    disponible: {
        type: Boolean,
        required: true,
    },
    img: {
        type: String,
        required: true
    },
});

module.exports = model('ingrediente', ingredienteSchema);