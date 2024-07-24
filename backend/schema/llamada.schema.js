"use strict";

const Joi = require("joi");

// Validación del esquema de llamada al mesero
const callWaiterSchema = Joi.object({
    tableNumber: Joi.number().required().messages({
        "number.base": "El número de mesa debe ser un número.",
        "any.required": "El número de mesa es obligatorio.",
    }),
    customerName: Joi.string().required().messages({
        "string.empty": "El nombre del cliente no puede estar vacío.",
        "any.required": "El nombre del cliente es obligatorio.",
        "string.base": "El nombre del cliente debe ser de tipo string.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { callWaiterSchema };
