"use strict";
const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedido.controller");

// Ruta para crear un nuevo pedido con el id de la mesa
router.post("/:mesaId", pedidoController.createPedido);

router.get("/:id", pedidoController.getPedido);
router.put("/:id", pedidoController.updatePedido);
router.delete("/:id", pedidoController.deletePedido);
router.get("/", pedidoController.getPedidos);
router.get("/mesa/:mesaId", pedidoController.getPedidosByMesaId);

module.exports = router;
