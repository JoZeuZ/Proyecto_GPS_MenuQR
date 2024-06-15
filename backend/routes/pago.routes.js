"use strict";
const express = require("express");
const router = express.Router();
const pagoController = require("../controllers/pago.controller");

router.post("/", pagoController.createPago);
router.get("/:id", pagoController.getPago);
router.put("/:id", pagoController.updatePago);
router.get("/", pagoController.getPagos);

// Rutas para cancelar y reembolsar un pago por ID
router.put("/cancel/:id", pagoController.cancelPago);
router.put("/reembolsar/:id", pagoController.reembolsarPago);

module.exports = router;
