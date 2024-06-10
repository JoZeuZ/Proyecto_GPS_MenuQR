"use strict";
const express = require("express");
const usuarioController = require("../controllers/user.controller.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const router = express.Router();

// router.put("/:id", authenticationMiddleware, authorizationMiddleware.isAdmin, usuarioController.updateUser);
// router.delete("/:id", authenticationMiddleware, authorizationMiddleware.isAdmin, usuarioController.deleteUser);

// router.post("/", authenticationMiddleware, authorizationMiddleware.isAdmin, usuarioController.createUser);
// router.get("/", usuarioController.getUsers);
// router.get("/:id", authenticationMiddleware, authorizationMiddleware.isAdmin, usuarioController.getUserById);

router.put("/:id",  usuarioController.updateUser);
router.delete("/:id", usuarioController.deleteUser);

router.post("/", usuarioController.createUser);
router.get("/", usuarioController.getUsers);
router.get("/:id", usuarioController.getUserById);

// Muestran mensajes cuando se necesita enviar ID pero esta vacio
router.delete('/', authenticationMiddleware, authorizationMiddleware.isAdmin, usuarioController.handleMissingId);
router.put('/', authenticationMiddleware, authorizationMiddleware.isAdmin, usuarioController.handleMissingId);

// Muestra mensaje cuando no haya que usar un ID pero se haya enviado
router.post('/:id', authenticationMiddleware, authorizationMiddleware.isAdmin, usuarioController.handleId);

module.exports = router;