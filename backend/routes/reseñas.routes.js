"use strict";

const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const reseñaController = require("../controllers/reseñas.controller.js");

const express = require("express");
const router = express.Router();

router.get("/", reseñaController.getReseñas);
router.get("/:id", reseñaController.getReseñaById);
router.post("/", reseñaController.createReseña);
router.put("/:id", reseñaController.updateReseña);
router.delete("/:id", reseñaController.deleteReseña);

module.exports = router;