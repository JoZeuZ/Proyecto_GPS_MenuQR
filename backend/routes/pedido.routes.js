"use strict";
const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedido.controller");

router.post("/", pedidoController.createPedido);
router.get("/:id", pedidoController.getPedido);
router.put("/:id", pedidoController.updatePedido);

module.exports = router;
