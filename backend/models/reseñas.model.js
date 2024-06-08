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
}, {
    timestamps: true
});

module.exports = model('Reseña', reseñaSchema);