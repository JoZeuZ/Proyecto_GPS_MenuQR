"use strict";
const { model, Schema } = require('mongoose');

const pedidoSchema = new Schema({
    cliente: {
        type: String,
        required: true
    },
    mesa: {
        type: Schema.Types.ObjectId,
        ref: "Mesa",
        required: true
    },
    productos: [
        {
            productoId: { type: Schema.Types.ObjectId, ref: "Producto" },
            cantidad: { type: Number, required: true },
            extras: { type: String }
        }
    ],
    estado: {
        type: String,
        enum: ['Pendiente', 'Preparación', 'Completado'],
        default: 'Pendiente'
    },
    total: {
        type: Number,
        required: true
    },
    propina: {
        type: Number,
        default: 0
    },
    metodoPago: {
        type: String,
        enum: ['Efectivo', 'Tarjeta', 'Transferencia'],
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Pedido', pedidoSchema);
