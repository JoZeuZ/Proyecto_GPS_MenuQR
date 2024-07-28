"use strict";
const productoController = require("../controllers/productos.controller.js");
const express = require("express");
const router = express.Router();

router.get("/",  productoController.getProductos);
router.get("/:id", productoController.getProductoById);
router.post("/", productoController.createProducto);
router.put("/:id", productoController.updateProducto);
router.delete("/:id", productoController.deleteProducto);

module.exports = router;