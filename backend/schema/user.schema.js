"use strict";
const Joi = require("joi");
const ROLES = require("../constants/roles.constants");

const userBodySchema = Joi.object({
    username: Joi.string().required().messages({
        "string.empty": "El nombre de usuario no puede estar vacío.",
        "any.required": "El nombre de usuario es obligatorio.",
        "string.base": "El nombre de usuario debe ser de tipo string.",
    }),
    email: Joi.string().email().messages({
        "string.base": "El email debe ser de tipo string.",
        "string.email": "El email debe tener un formato válido.",
    }),
    password: Joi.string().messages({
        "string.base": "La contraseña debe ser de tipo string.",
    }),
    roles: Joi.array()
        .items(Joi.string().valid(...ROLES))
        .required()
        .messages({
            "array.base": "El rol debe ser de tipo array.",
            "any.required": "El rol es obligatorio.",
            "string.base": "El rol debe ser de tipo string.",
            "any.only": "El rol proporcionado no es válido.",
        }),
    newPassword: Joi.string().min(5).messages({
        "string.empty": "La contraseña no puede estar vacía.",
        "string.base": "La contraseña debe ser de tipo string.",
        "string.min": "La contraseña debe tener al menos 5 caracteres.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

const userIdSchema = Joi.object({
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

module.exports = { userBodySchema, userIdSchema };
