"use strict";
const mongoose = require('mongoose');
const { handleError } = require("../utils/errorHandler");
const { DB_URL } = require("./configEnv");

async function setupDB() {
    try {
        await mongoose.connect(DB_URL);
        console.log("=> Conectado a la base de datos");
    } catch (err) {
        handleError(err, "/configDB.js -> setupDB");
    }
}

module.exports = { setupDB };