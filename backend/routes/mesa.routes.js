"use strict";
const express = require("express");
const router = express.Router();
const mesaController = require("../controllers/mesa.controller");

router.post("/", mesaController.createMesa);
router.get("/:id", mesaController.getMesa);
router.put("/:id", mesaController.updateMesa);
router.get("/", mesaController.getMesas);
router.delete("/:id", mesaController.deleteMesa);
router.delete("/delete/:Nmesa", mesaController.deleteMesaByNumMesa);
router.get("/number/:Nmesa", mesaController.getMesaByNumber);

module.exports = router;
