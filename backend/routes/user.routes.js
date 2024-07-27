"use strict";
const express = require("express");
const usuarioController = require("../controllers/user.controller.js");
const router = express.Router();

router.put("/:id", usuarioController.updateUser);
router.delete("/:id", usuarioController.deleteUser);

router.post("/", usuarioController.createUser); 
router.get("/", usuarioController.getUsers);
router.get("/:id", usuarioController.getUserById);

// Muestran mensajes cuando se necesita enviar ID pero esta vacio
router.delete('/', usuarioController.handleMissingId);
router.put('/', usuarioController.handleMissingId);

// Muestra mensaje cuando no haya que usar un ID pero se haya enviado
router.post('/:id', usuarioController.handleId);

module.exports = router;
