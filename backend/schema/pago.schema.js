"use strict";
const Joi = require("joi");

const pagoBodySchema = Joi.object({
    pedidoId: Joi.string().required().messages({
        "string.base": "El id del pedido debe ser de tipo string.",
        "any.required": "El id del pedido es obligatorio.",
    }),
    monto: Joi.number().required().messages({
        "number.base": "El monto debe ser de tipo number.",
        "any.required": "El monto es obligatorio.",
    }),
    metodoPago: Joi.string().valid("Efectivo", "Tarjeta", "Transferencia").required().messages({
        "string.base": "El método de pago debe ser de tipo string.",
        "any.required": "El método de pago es obligatorio.",
        "any.only": "El método de pago proporcionado no es válido.",
    }),
    fecha: Joi.date().default(Date.now),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

const pagoIdSchema = Joi.object({
    id: Joi.string()
        .required()
        .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
        .messages({
            "string.empty": "El id no puede estar vacío.",
            "any.required": "El id es obligatorio.",
            "string.base": "El id debe ser de tipo string.",
            "string.pattern.base": "El id proporcionado no es válido.",
        }),
});

module.exports = { pagoBodySchema, pagoIdSchema };
