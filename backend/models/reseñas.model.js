"use strict";

const { model, Schema } = require('mongoose');

const reseñaSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    estrellas: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        validate: {
            validator: function(v) {
                return Number.isInteger(v) && v >= 1 && v <= 5;
            },
            message: props => `${props.value} no es un valor de estrellas válido. Debe ser un entero entre 1 y 5.`
    }
    },
    categoria: {
        type: String,
        enum: ['Comida', 'Servicio', 'Ambiente', 'General'],
        default: 'General'
    }
}, {
    timestamps: true
});

module.exports = model('Reseña', reseñaSchema);