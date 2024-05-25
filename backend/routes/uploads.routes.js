"use strict";
const express = require('express');
const router = express.Router();
const uploadService = require('../services/uploads.service.js');

router.post('/upload', uploadService.uploadFile);

module.exports = router;
