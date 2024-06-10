"use strict";
const express = require("express");
const router = express.Router();
const pagoController = require("../controllers/pago.controller");


router.post("/", pagoController.createPago);
router.get("/:id", pagoController.getPago);
router.put("/:id", pagoController.updatePago);

// Ruta para cancelar un pago por ID
router.put("/cancel/:id", pagoController.cancelPago);

router.get("/", pagoController.getPagos);

module.exports = router;
