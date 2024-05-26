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
});

module.exports = model('reseña', reseñaSchema);