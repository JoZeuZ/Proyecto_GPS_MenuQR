const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes.js");
const platosRoutes = require("./platos.routes.js");
const ingredientesRoutes = require("./ingredientes.routes.js");

// ruta localhost:3000/api/platos
// router.use("/users", userRoutes);
router.use("/platos", platosRoutes);
router.use("/ingredientes", ingredientesRoutes);

module.exports = router;