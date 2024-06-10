"use strict";
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
const { handleError } = require("../utils/errorHandler");

async function getUsers() {
    try {
        const users = await User.find()
            .select("-password")
            .populate("roles")
            .exec();

        if (!users) return [null, "No hay usuarios"];
        return [users, null];
    } catch (error) {
        handleError(error, "user.service -> getUsers");
    }
}

async function createUser(user) {
    try {
        const { username, email, password, roles } = user;
        let userFound = await User.findOne({ username });
        let emailFound = await User.findOne({ email });

        if (userFound) return [null, "Ya existe un usuario registrado con ese nombre de usuario"];
        if (emailFound) return [null, "Ya existe un usuario registrado con ese email"];
        const rolesFound = await Role.find({ name: { $in: roles } });
        if (rolesFound.length === 0) return [null, "El rol no existe"];
        const myRole = rolesFound.map((role) => role._id);
        const newUser = new User({
            username,
            email: email || "",
            password: await User.encryptPassword(password) || "",
            roles: myRole,
        });
        await newUser.save();
        return [newUser, null];
    } catch (error) {
        handleError(error, "user.service -> createUser");
        return [null, error];
    }
}

async function getUserById(id) {
    try {
        const user = await User.findById({ _id: id })
            .select("-password")
            .populate("roles")
            .exec();

        if (!user) return [null, "El usuario no existe"];
        return [user, null];
    } catch (error) {
        handleError(error, "user.service -> getUserById");
    }
}

async function updateUser(id, user) {
    try {
        const userFound = await User.findById(id);

        if (!userFound) return [null, "El usuario no existe"];
        const { username, email, password, newPassword, roles } = user;
        const matchPassword = await User.comparePassword(
            password,
            userFound.password,
        );
        if (!matchPassword) {
            return [null, "La contraseña no coincide"];
        }
        const rolesFound = await Role.find({ name: { $in: roles } });
        if (rolesFound.length === 0) return [null, "El rol no existe"];
        const myRole = rolesFound.map((role) => role._id);
        const userUpdated = await User.findByIdAndUpdate(
            id,
            {
                username,
                email,
                password: await User.encryptPassword(newPassword || password),
                roles: myRole,
            },
            { new: true },
        );
        return [userUpdated, null];
    } catch (error) {
        handleError(error, "user.service -> updateUser");
    }
}

async function deleteUser(id) {
    try {
        const user = await User.findById(id);
        if (!user) return [null, "El usuario no existe"];
        const userDeleted = await User.findByIdAndDelete(id);
        if (!userDeleted) return [null, "No se encontró el usuario"];
        return [userDeleted, null];
    } catch (error) {
        handleError(error, "user.service -> deleteUser");
        return [null, "Error al eliminar el usuario"];
    }
} // Se modifico por error que aparecia en el front, de duplicacion de llamado

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};