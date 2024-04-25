"use strict";
const productoController = require("../controllers/productos.controller.js");

const express = require("express");
const router = express.Router();

router.get("/",  productoController.getProductos);
router.post("/", productoController.createProducto);

module.exports = router;