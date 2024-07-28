"use strict";
const { model, Schema } = require('mongoose');
const { ingredientesSchema } = require('./ingredientes.model');

const productoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    ingredientes: [
        { // mongoose.Schema.Types.ObjectId
            type: String,
            ref: "ingrediente"
        }
    ]
});

module.exports = model('Producto', productoSchema);