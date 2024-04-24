"use strict";
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Role = require("../models/role.model.js");

// Crea el esquema de la coleccion 'usuarios'
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: Role,
            },
        ],
    },
    {
        versionKey: false,
    },
);

/** Encripta la contraseña del usuario */
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

/** Compara la contraseña del usuario */
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

/** Modelo de datos 'User' */
const User = mongoose.model("User", userSchema);

// Exporta el modelo de datos 'User'
module.exports = User;