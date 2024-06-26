"use strict";

const menuController = require("../controllers/menu.controller.js");
const express = require("express");
const router = express.Router();

router.get("/", menuController.getMenu);
router.post("/", menuController.createMenu);

module.exports = router;