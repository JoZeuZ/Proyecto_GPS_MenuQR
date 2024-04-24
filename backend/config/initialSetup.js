"use strict";
const Role = require("../models/role.model.js");

async function createRoles() {
    try {
        // Busca todos los roles en la base de datos
        const count = await Role.estimatedDocumentCount();
        // Si no hay roles en la base de datos los crea
        if (count > 0) return;

        await Promise.all([
            new Role({ name: "Administrador" }).save(),
            new Role({ name: "Mesero" }).save(),
            new Role({ name: "Cliente" }).save(),
        ]);
        console.log("* => Roles creados exitosamente"); x
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    createRoles,
}