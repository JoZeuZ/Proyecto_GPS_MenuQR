"use strict";

const menuController = require("../controllers/menu.controller.js");
const express = require("express");
const router = express.Router();

router.get("/", menuController.getMenu);
router.post("/", menuController.createMenu);
router.put("/:id", menuController.updateMenu);
router.delete("/:id", menuController.deleteMenu);

module.exports = router;