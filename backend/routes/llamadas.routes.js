"use strict";
const express = require("express");
const { callWaiter, getWaiterCalls } = require('../controllers/llamada.controller');
const router = express.Router();

router.post("/call-waiter", callWaiter);
router.get("/waiter-calls", getWaiterCalls);

module.exports = router;
