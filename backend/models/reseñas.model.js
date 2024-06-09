"use strict";

const { model, Schema } = require('mongoose');

const reseñaSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripción: {
        type: String,
        required: true
    },
    estrellas: {
        type: Number,
        required: true,
        min: 0.5,
        max: 5,
        validate: {
            validator: function(v) {
                return Number.isInteger(v * 2);
            },
            message: props => `${props.value} no es un valor de estrellas válido. Debe ser un múltiplo de 0.5. Con maximo valor de 5.`
        }
    }
}, {
    timestamps: true
});

module.exports = model('Reseña', reseñaSchema);