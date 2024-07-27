"use strict";

const Joi = require("joi");

const callWaiterSchema = Joi.object({
    tableNumber: Joi.number().required().messages({
        "number.base": "El número de mesa debe ser un número.",
        "any.required": "El número de mesa es obligatorio.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { callWaiterSchema };
