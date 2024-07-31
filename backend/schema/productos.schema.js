"use strict";

const Joi = require("joi");

const productoBodySchema = Joi.object({
    nombre: Joi.string().required().messages({
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio.",
        "string.base": "El nombre debe ser de tipo string.",
    }),
    precio: Joi.number().required().messages({
        "number.base": "El precio debe ser de tipo number.",
        "any.required": "El precio es obligatorio.",
    }),
    descripcion: Joi.string().required().messages({
        "string.empty": "La descripción no puede estar vacía.",
        "any.required": "La descripción es obligatoria.",
        "string.base": "La descripción debe ser de tipo string.",
    }),
    categoria: Joi.string().required().messages({
        "string.empty": "La categoría no puede estar vacía.",
        "any.required": "La categoría es obligatoria.",
        "string.base": "La categoría debe ser de tipo string.",
    }),
    img: Joi.string().messages({
        "string.base": "La imagen debe ser de tipo string.",
    }),
    ingredientes: Joi.array().items(Joi.string()).required().messages({
        "array.base": "Los ingredientes deben ser de tipo array.",
        "any.required": "Los ingredientes son obligatorios.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { productoBodySchema, productoIdSchema };
