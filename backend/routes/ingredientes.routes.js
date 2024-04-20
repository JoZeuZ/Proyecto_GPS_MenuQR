"use strict";
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const ingredienteController = require("../controllers/ingredientes.controller.js");

const express = require("express");
const router = express.Router();

router.get("/", authenticationMiddleware, authorizationMiddleware.isAdmin, ingredienteController.getIngredientes);
router.get("/:id", authenticationMiddleware, authorizationMiddleware.isAdmin, ingredienteController.getIngredienteById);
router.post("/", authenticationMiddleware, authorizationMiddleware.isAdmin, ingredienteController.createIngrediente);
router.put("/:id", authenticationMiddleware, authorizationMiddleware.isAdmin, ingredienteController.updateIngrediente);
router.delete("/:id", authenticationMiddleware, authorizationMiddleware.isAdmin, ingredienteController.deleteIngrediente);

// Muestran mensajes cuando se necesita enviar ID pero esta vacio
router.delete('/', authenticationMiddleware, authorizationMiddleware.isAdmin, ingredienteController.handleMissingId);
router.put('/', authenticationMiddleware, authorizationMiddleware.isAdmin, ingredienteController.handleMissingId);

// Muestra mensaje cuando no haya que usar un ID pero se haya enviado
router.post('/:id', authenticationMiddleware, authorizationMiddleware.isAdmin, ingredienteController.handleId);

module.exports = router;