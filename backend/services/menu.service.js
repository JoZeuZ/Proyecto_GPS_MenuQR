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

async function updateMenu(req, res) {
    try {
        const { id } = req.params;
        const { productos } = req.body;

        if (!productos) {
            return respondError(req, res, 400, "Faltan datos");
        }
        const [updatedMenu, errorMenu] = await MenuService.updateMenu(id, { productos });
        if (errorMenu) return respondError(req, res, 400, errorMenu);
        respondSuccess(req, res, 200, ["Menu actualizado: ", updatedMenu]);
    } catch (error) {
        handleError(error, "menu.controller -> updateMenu");
    }
}

async function deleteMenu(req, res) {
    try {
        const { id } = req.params;
        const [deletedMenu, errorMenu] = await MenuService.deleteMenu(id);
        if (errorMenu) return respondError(req, res, 400, errorMenu);
        respondSuccess(req, res, 200, ["Menu eliminado: ", deletedMenu]);
    } catch (error) {
        handleError(error, "menu.controller -> deleteMenu");
    }
}

module.exports = {
    getMenu,
    createMenu,
    updateMenu,
    deleteMenu
};


