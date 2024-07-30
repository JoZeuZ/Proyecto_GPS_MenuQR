"use strict";
const Joi = require("joi");

const pedidoBodySchema = Joi.object({
    cliente: Joi.string().required().min(3).max(50).messages({
        "string.empty": "El cliente no puede estar vacío.",
        "any.required": "El cliente es obligatorio.",
        "string.base": "El cliente debe ser de tipo string.",
        "string.min": "El nombre debe tener al menos 3 caracteres.",
        "string.max": "El nombre no puede tener más de 50 caracteres."
    }),
    mesa: Joi.string().required().messages({
        "string.empty": "La mesa no puede estar vacía.",
        "any.required": "La mesa es obligatoria.",
        "string.base": "El id de la mesa debe ser de tipo string.",
    }),
    productos: Joi.array().items(Joi.object({
        productoId: Joi.string().required().messages({
            "string.empty": "El id del producto no puede estar vacío.",
            "any.required": "El id del producto es obligatorio.",
            "string.base": "El id del producto debe ser de tipo string.",
        }),
        cantidad: Joi.number().required().min(1).messages({
            "number.base": "La cantidad debe ser de tipo number.",
            "any.required": "La cantidad es obligatoria.",
            "number.min": "La cantidad debe ser al menos 1."
        }),
        extras: Joi.string().messages({
            "string.base": "Los extras deben ser de tipo string.",
        }),
    })).required().min(1).messages({
        "array.base": "Los productos deben ser de tipo array.",
        "any.required": "Los productos son obligatorios.",
        "array.min": "Debe haber al menos un producto en el pedido."
    }),
    estado: Joi.string().valid("Pendiente", "Preparación", "Completado").default("Pendiente"),
    total: Joi.number().messages({
        "number.base": "El total debe ser de tipo number.",
    }),
    propina: Joi.number().default(0).min(0).messages({
        "number.base": "La propina debe ser de tipo number.",
        "number.min": "La propina no puede ser negativa.",
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

const pedidoIdSchema = Joi.object({
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

module.exports = { pedidoBodySchema, pedidoIdSchema };
