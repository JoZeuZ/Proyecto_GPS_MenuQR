"use strict";
const { model, Schema } = require('mongoose');

const platoSchema = new Schema({
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
        required: true
    },
    ingredientes: [
        { // mongoose.Schema.Types.ObjectId
            type: String,
            ref: "ingredientes"
        }
    ]
});

module.exports = model('plato', platoSchema);