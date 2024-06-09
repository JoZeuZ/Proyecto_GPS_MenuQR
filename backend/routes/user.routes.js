"use strict";
const express = require("express");
const usuarioController = require("../controllers/user.controller.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const router = express.Router();

router.put("/:id", authenticationMiddleware, authorizationMiddleware.isAdmin, usuarioController.updateUser);
router.delete("/:id", authenticationMiddleware, authorizationMiddleware.isAdmin, usuarioController.deleteUser);

router.post("/register", authenticationMiddleware, authorizationMiddleware.isAdmin, usuarioController.createUser);
router.get("/", usuarioController.getUsers);
router.get("/:id", authenticationMiddleware, authorizationMiddleware.isAdmin, usuarioController.getUserById);


module.exports = router;