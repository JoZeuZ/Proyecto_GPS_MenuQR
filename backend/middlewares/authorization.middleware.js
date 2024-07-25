"use strict";
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
const { respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");

async function isAdmin(req, res, next) {
    try {
        const user = await User.findOne({ email: req.email });
        const roles = await Role.find({ _id: { $in: user.roles } });
        for (const role of roles) {
            console.log(roles);
            if (role.name === "Administrador") {
                next();
                return;
            }
        }
        return respondError(
            req,
            res,
            401,
            "Se requiere un rol de administrador para realizar esta acción"
        );
    } catch (error) {
        handleError(error, "authorization.middleware -> isAdmin");
    }
}

async function isMesero(req, res, next) {
    try {
        const user = await User.findOne({ email: req.email });
        const roles = await Role.find({ _id: { $in: user.roles } });

        for (const role of roles) {
            if (role.name === "Mesero") {
                next();
                return;
            }
        }
        return respondError(
            req,
            res,
            401,
            "Se requiere un rol de mesero para realizar esta acción"
        );
    } catch (error) {
        handleError(error, "authorization.middleware -> isMesero");
    }
}

async function isAny(req, res, next) {
    try {
        const user = await User.findOne({ email: req.email });
        const roles = await Role.find({ _id: { $in: user.roles } });

        for (const role of roles) {
            if (role.name === "Administrador" || role.name === "Mesero") {
                next();
                return;
            }
        }
        return respondError(
            req,
            res,
            401,
            "Se requiere un rol cualquiera para realizar esta acción"
        );
    } catch (error) {
        handleError(error, "authorization.middleware -> isAny");
    }
}

module.exports = {
    isAny,
    isAdmin,
    isMesero,
};