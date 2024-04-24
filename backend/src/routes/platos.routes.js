const express = require("express");
const router = express.Router();

const platoController = require("../controllers/platos.controller.js");


router.get("/",  platoController.getPlatos);


// router.use('/platos', require('./api/platos'));

module.exports = router;