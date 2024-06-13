"use strict";
const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes.js");
const userRoutes = require("./user.routes.js");
const productosRoutes = require("./productos.routes.js");
const ingredientesRoutes = require("./ingredientes.routes.js");
const reseñasRoutes = require("./reseñas.routes.js");
const llamadasRoutes = require("./llamadas.routes.js");

router.use("/users", userRoutes);
router.use("/productos", productosRoutes);
router.use("/ingredientes", ingredientesRoutes);
router.use("/auth", authRoutes);
router.use("/resenas", reseñasRoutes);
router.use("/llamadas", llamadasRoutes);

module.exports = router;