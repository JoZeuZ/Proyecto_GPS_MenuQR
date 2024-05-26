"use strict";

const Joi = require("joi");

const reseñaBodySchema = Joi.object({
    titulo: Joi.string().required().messages({
        "string.empty": "El título de la reseña no puede estar vacío.",
        "any.required": "El título de la reseña es obligatorio.",
        "string.base": "El título de la reseña debe ser de tipo string.",
    }),
    descripción: Joi.string().required().messages({
        "string.empty": "La descripción de la reseña no puede estar vacía.",
        "any.required": "La descripción de la reseña es obligatoria.",
        "string.base": "La descripción de la reseña debe ser de tipo string.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

const reseñaIdSchema = Joi.object({
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

module.exports = { reseñaBodySchema, reseñaIdSchema };