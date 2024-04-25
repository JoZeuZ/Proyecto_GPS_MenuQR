"use strict";
const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes.js");
const userRoutes = require("./user.routes.js");
const productosRoutes = require("./productos.routes.js");
const ingredientesRoutes = require("./ingredientes.routes.js");

router.use("/users", userRoutes);
router.use("/productos", productosRoutes);
router.use("/ingredientes", ingredientesRoutes);
router.use("/auth", authRoutes)

module.exports = router;