const ingredienteController = require("../controllers/ingredientes.controller.js");

const express = require("express");
const router = express.Router();

router.get("/",  ingredienteController.getIngredientes);
router.get("/:id",  ingredienteController.getIngredienteById);
router.post("/", ingredienteController.createIngrediente);
router.put("/:id", ingredienteController.updateIngrediente);
router.delete("/:id", ingredienteController.deleteIngrediente);


module.exports = router;