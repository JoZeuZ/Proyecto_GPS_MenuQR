"use strict";

const Joi = require("joi");

const reseñaBodySchema = Joi.object({
    titulo: Joi.string().trim().min(5).max(100).required().messages({
        "string.empty": "El título de la reseña no puede estar vacío.",
        "any.required": "El título de la reseña es obligatorio.",
        "string.base": "El título de la reseña debe ser de tipo string.",
        "string.min": "El título de la reseña debe tener al menos 5 caracteres.",
        "string.max": "El título de la reseña no puede exceder los 100 caracteres."
    }),
    descripción: Joi.string().trim().min(10).max(500).required().messages({
        "string.empty": "La descripción de la reseña no puede estar vacía.",
        "any.required": "La descripción de la reseña es obligatoria.",
        "string.base": "La descripción de la reseña debe ser de tipo string.",
        "string.min": "La descripción de la reseña debe tener al menos 10 caracteres.",
        "string.max": "La descripción de la reseña no puede exceder los 500 caracteres."
    }),
    estrellas: Joi.number().required().min(0.5).max(5).custom((value, helpers) => {
        if (!Number.isInteger(value * 2)) {
            return helpers.message('La puntuación debe ser un múltiplo de 0.5');
        }
        return value;
    }).messages({
        "number.base": "La puntuación debe ser de tipo numérico.",
        "number.empty": "La puntuación no puede estar vacía.",
        "any.required": "La puntuación es obligatoria.",
        "number.min": "La puntuación mínima es 0.5.",
        "number.max": "La puntuación máxima es 5."
    }),
    categoria: Joi.string().valid('Comida', 'Servicio', 'Ambiente', 'General').default('General').messages({
        "string.base": "La categoría debe ser de tipo string.",
        "any.only": "La categoría debe ser uno de los valores permitidos (Comida, Servicio, Ambiente, General)."
    })
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