"use strict";
const express = require("express");
const router = express.Router();
const path = require('path');

const authRoutes = require("./auth.routes.js");
const userRoutes = require("./user.routes.js");
const productosRoutes = require("./productos.routes.js");
const ingredientesRoutes = require("./ingredientes.routes.js");
const uploadRoutes = require("./uploads.routes.js");
const pagoRoutes = require("./pago.routes.js");
const mesaRoutes = require("./mesa.routes.js");
const pedidoRoutes = require("./pedido.routes.js");

router.use("/users", userRoutes);
router.use("/productos", productosRoutes);
router.use("/ingredientes", ingredientesRoutes);
router.use("/pagos", pagoRoutes); 
router.use("/mesas", mesaRoutes);
router.use("/pedidos", pedidoRoutes);
router.use("/auth", authRoutes);
router.use("/", uploadRoutes);

module.exports = router;