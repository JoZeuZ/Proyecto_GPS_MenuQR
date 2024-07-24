"use strict";

const Joi = require("joi");

const menuBodySchema = Joi.object({
    productos: Joi.array().items(Joi.string().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/))
        .required()
        .messages({
            "string.empty": "El id de producto no puede estar vacío.",
            "any.required": "El id de producto es obligatorio.",
            "string.base": "El id de producto debe ser de tipo string.",
            "string.pattern.base": "El id proporcionado no es válido.",
        }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

const menuIdSchema = Joi.object({
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

module.exports = { menuBodySchema, menuIdSchema };
