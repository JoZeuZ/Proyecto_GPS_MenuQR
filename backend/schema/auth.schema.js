"use strict";
const Joi = require("joi");

const authLoginBodySchema = Joi.object({
    email: Joi.string().email().messages({
        "string.empty": "El email no puede estar vacío.",
        "string.base": "El email debe ser de tipo string.",
        "string.email": "El email debe tener un formato válido.",
    }),
    password: Joi.string().messages({
        "string.empty": "La contraseña no puede estar vacía.",
        "string.base": "La contraseña debe ser de tipo string.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { authLoginBodySchema };
