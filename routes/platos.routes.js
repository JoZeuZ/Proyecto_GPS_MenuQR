const express = require("express");
const router = require('express').Router();

const platoController = require("../controllers/platos.controller");


router.get('/',  platoController.getPlatos);

// router.use('/platos', require('./api/platos'));

module.exports = router;