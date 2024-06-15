"use strict";
const UserService = require("../services/user.service");
const { handleError } = require("../utils/errorHandler");
const { respondSuccess, respondError } = require("../utils/resHandler");
const { userBodySchema, userIdSchema } = require("../schema/user.schema");

async function getUsers(req, res) {
    try {
        const [usuarios, errorUsuarios] = await UserService.getUsers();
        if (errorUsuarios) return respondError(req, res, 404, errorUsuarios);

        usuarios.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, usuarios);
    } catch (error) {
        handleError(error, "user.controller -> getUsers");
        respondError(req, res, 400, error.message);
    }
}

async function createUser(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = userBodySchema.validate(body);

        if (bodyError) return respondError(req, res, 400, bodyError.message);
        const [newUser, userError] = await UserService.createUser(body);
        if (userError) return respondError(req, res, 400, userError);
        if (!newUser) return respondError(req, res, 400, "No se creo el usuario");
        respondSuccess(req, res, 201, newUser);
    } catch (error) {
        console.log('Error en createUser:', error.message);
        handleError(error, "user.controller -> createUser");
        respondError(req, res, 500, "No se creo el usuario");
    }
}

async function getUserById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = userIdSchema.validate(params);

        if (paramsError) return respondError(req, res, 400, paramsError.message);
        const [user, errorUser] = await UserService.getUserById(params.id);
        if (errorUser) return respondError(req, res, 404, errorUser);
        respondSuccess(req, res, 200, user);
    } catch (error) {
        handleError(error, "user.controller -> getUserById");
        respondError(req, res, 500, "No se pudo obtener el usuario");
    }
}

async function updateUser(req, res) {
    try {
        const { params, body } = req;

        const { error: paramsError } = userIdSchema.validate(params);
        if (paramsError) {
            return respondError(req, res, 400, "Error de validación de parámetros", paramsError.details);
        }

        const { error: bodyError } = userBodySchema.validate(body);
        if (bodyError) {
            console.log(body)
            console.log(bodyError)
            console.log(bodyError.details)
            return respondError(req, res, 400, "Error de validación del cuerpo de la solicitud", bodyError.details);
        }

        const [user, userError] = await UserService.updateUser(params.id, body);
        if (userError) {
            return respondError(req, res, 400, "Error al actualizar el usuario", { message: userError });
        }

        respondSuccess(req, res, 200, user);
    } catch (error) {
        handleError(error, "user.controller -> updateUser");
        respondError(req, res, 500, "No se pudo actualizar el usuario", { message: error.message, stack: error.stack });
    }
}

async function deleteUser(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = userIdSchema.validate(params);

        if (paramsError) return respondError(req, res, 400, paramsError.message);
        const user = await UserService.deleteUser(params.id);
        !user
            ? respondError(
                req,
                res,
                404,
                "No se encontro el usuario solicitado",
                "Verifique el id ingresado",
            )
            : respondSuccess(req, res, 200, user);
    } catch (error) {
        handleError(error, "user.controller -> deleteUser");
        respondError(req, res, 500, "No se pudo eliminar el usuario");
    }
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};