"use strict";

const { handleError } = require("../utils/errorHandler");
const MenuService = require("../services/menu.service");

async function getMenu(req, res) {
    try {
        const [menu, errorMenu] = await MenuService.getMenu();

        if (errorMenu) return respondError(req, res, 404, errorMenu);
        menu.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, ["El menu es: ", menu]);
    }
    catch (error) {
        handleError(error, "menu.controller -> getMenu");
    }
}

async function createMenu(req, res) {
    try {
        const { productos } = req.body;

        if (!productos) {
            return respondError(req, res, 400, "Faltan datos");
        }
        const [newMenu, errorMenu] = await MenuService.createMenu({ productos });
        if (errorMenu) return respondError(req, res, 400, errorMenu);
        respondSuccess(req, res, 201, ["Menu creado: ", newMenu]);
    } catch (error) {
        handleError(error, "menu.controller -> createMenu");
    }
}

module.exports = {
    getMenu,
    createMenu,
};


