"use strict";
require('dotenv').config();
const cors = require("cors");
const morgan = require("morgan");
const express = require('express');
const cookieParser = require("cookie-parser");
const { setupDB } = require("./config/db.js");
const indexRoutes = require("./routes/index.routes.js");
const { PORT, HOST } = require("./config/configEnv.js");
const { createRoles } = require('./config/initialSetup.js');
const { handleFatalError, handleError } = require("./utils/errorHandler.js");
const path = require('path');

async function setupServer() {
    try {
        const server = express();
        server.use(express.json());
        server.use(cors({ origin: "http://localhost:4200", credentials: true }));
        server.use(cookieParser());
        server.use(morgan("dev"));
        server.use(express.urlencoded({ extended: true }));

        // Sirve archivos estáticos
        server.use("/api/uploads", express.static(path.join(__dirname, "uploads")));
        server.use("/api", indexRoutes);

        server.use((err, req, res, next) => {
            if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
                return res.status(400).json({ message: "Error en formato de JSON" });
            }
            res.status(500).json({ message: 'Internal Server Error', error: err.message });
        });
        

        server.listen(PORT, () => {
            console.log(`=> Servidor corriendo en ${HOST}:${PORT}/api`);
        });
    } catch (err) {
        handleError(err, "/server.js -> setupServer");
    }
}

async function setupAPI() {
    try {
        await setupDB();
        await setupServer();
        await createRoles();
    } catch (err) {
        handleFatalError(err, "/server.js -> setupAPI");
    }
}

setupAPI()
    .then(() => console.log("=> API Iniciada exitosamente"))
    .catch((err) => handleFatalError(err, "/server.js -> setupAPI"));
