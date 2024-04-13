const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes.js");
const userRoutes = require("./user.routes.js");
const platosRoutes = require("./platos.routes.js");
const ingredientesRoutes = require("./ingredientes.routes.js");

router.use("/users", userRoutes);
router.use("/platos", platosRoutes);
router.use("/ingredientes", ingredientesRoutes);
router.use("/auth", authRoutes)

module.exports = router;