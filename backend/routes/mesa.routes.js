"use strict";
const express = require("express");
const router = express.Router();
const mesaController = require("../controllers/mesa.controller");

router.post("/", mesaController.createMesa);
router.get("/:id", mesaController.getMesa);

module.exports = router;
