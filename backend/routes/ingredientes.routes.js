"use strict";
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const ingredienteController = require("../controllers/ingredientes.controller.js");

const express = require("express");
const multer = require('multer');
const router = express.Router();

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `imagen${Date.now()}${ext}`);  // Genera un nombre único para cada archivo
    }
});
const upload = multer({ storage });

// router.get("/", authenticationMiddleware, authorizationMiddleware.isAdmin, ingredienteController.getIngredientes);
// router.post("/", authenticationMiddleware, authorizationMiddleware.isAdmin, ingredienteController.createIngrediente);
// router.put("/:id", authenticationMiddleware, authorizationMiddleware.isAdmin, ingredienteController.updateIngrediente);
// router.delete("/:id", authenticationMiddleware, authorizationMiddleware.isAdmin, ingredienteController.deleteIngrediente);

router.get("/", ingredienteController.getIngredientes);
router.get("/:id", authenticationMiddleware, authorizationMiddleware.isAdmin, ingredienteController.getIngredienteById);
router.post("/",  ingredienteController.createIngrediente);
router.put("/:id", ingredienteController.updateIngrediente);
router.delete("/:id", ingredienteController.deleteIngrediente);

// Muestran mensajes cuando se necesita enviar ID pero esta vacio
router.delete('/', authenticationMiddleware, authorizationMiddleware.isAdmin, ingredienteController.handleMissingId);
router.put('/', authenticationMiddleware, authorizationMiddleware.isAdmin, ingredienteController.handleMissingId);

// Muestra mensaje cuando no haya que usar un ID pero se haya enviado
router.post('/:id', authenticationMiddleware, authorizationMiddleware.isAdmin, ingredienteController.handleId);

module.exports = router;