"use strict";
const { model, Schema } = require('mongoose');

const pagoSchema = new Schema({
    pedidoId: {
        type: Schema.Types.ObjectId,
        ref: "Pedido",
        required: true
    },
    metodoPago: {
        type: String,
        enum: ['Efectivo', 'Tarjeta', 'Transferencia'],
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['Completado', 'Reembolsado', 'Cancelado'],
        default: 'Completado'
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Pago', pagoSchema);
