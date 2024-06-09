"use strict";
const Joi = require("joi");

const mesaBodySchema = Joi.object({
    Nmesa: Joi.number().required().messages({
        "number.base": "El número de mesa debe ser de tipo numérico.",
        "any.required": "El número de mesa es obligatorio."
    }),
    codigoQR: Joi.string().required().messages({
        "string.base": "El código QR debe ser de tipo string.",
        "any.required": "El código QR es obligatorio."
    }),
    cantidadPersonas: Joi.number().required().messages({
        "number.base": "La cantidad de personas debe ser de tipo numérico.",
        "any.required": "La cantidad de personas es obligatoria."
    })
}).messages({
    "object.unknown": "No se permiten propiedades adicionales."
});

const mesaIdSchema = Joi.object({
    id: Joi.string()
        .required()
        .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
        .messages({
            "string.empty": "El id no puede estar vacío.",
            "any.required": "El id es obligatorio.",
            "string.base": "El id debe ser de tipo string.",
            "string.pattern.base": "El id proporcionado no es válido."
        })
});

module.exports = { mesaBodySchema, mesaIdSchema };
