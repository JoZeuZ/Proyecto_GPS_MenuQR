const platoController = require("../controllers/platos.controller.js");

const express = require("express");
const router = express.Router();

router.get("/",  platoController.getPlatos);

module.exports = router;