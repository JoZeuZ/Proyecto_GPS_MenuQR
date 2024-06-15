"use strict";
const Joi = require("joi");

const ingredienteBodySchema = Joi.object({
    nombre: Joi.string().pattern(/^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/)
    .required()
    .messages({
        "string.empty": "El nombre de usuario no puede estar vacío.",
        "any.required": "El nombre de usuario es obligatorio.",
        "string.pattern.base": "El nombre de usuario debe contener solo letras y espacios.",
        "string.base": "El nombre de usuario debe ser de tipo string.",
    }),
    disponible: Joi.boolean().messages({
        "string.base": "El estado disponible debe ser de tipo boolean.",
    }),
    img: Joi.string().messages({
        "string.base": "La img debe ser de tipo string.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

const ingredienteIdSchema = Joi.object({
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

module.exports = { ingredienteBodySchema, ingredienteIdSchema };
