const express = require("express");
const router = express.Router();

const platosRoutes = require("./platos.routes.js");

// ruta localhost:3000/api/platos
router.use("/platos", platosRoutes);

module.exports = router;