"use strict";
require('dotenv').config();
const cors = require("cors");
const morgan = require("morgan");
const express = require('express');
const http = require('http');
const cookieParser = require("cookie-parser");
const { setupDB } = require("./config/db.js");
const indexRoutes = require("./routes/index.routes.js");
const { PORT, HOST } = require("./config/configEnv.js");
const { createRoles } = require('./config/initialSetup.js');
const { handleFatalError, handleError } = require("./utils/errorHandler");
const { wss } = require('./config/websocket.js');

// Inicia el servidor web
async function setupServer() {
    try {
        const server = express();
        const httpServer = http.createServer(server);

        server.use(express.json());
        server.use(cors({ origin: "*" }));
        server.use(cookieParser());
        server.use(morgan("dev"));
        server.use(express.urlencoded({ extended: true }));
        server.use("/api", indexRoutes);

        server.use((err, req, res, next) => { // Error de análisis JSON (contenido incorrecto)
            if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
                return res.status(400).json({ message: "Error en formato de JSON" });
            }
            next(err); // Pasa otros errores a los manejadores de errores siguientes
        });

        httpServer.on('upgrade', (request, socket, head) => {
            wss.handleUpgrade(request, socket, head, (ws) => {
                wss.emit('connection', ws, request);
            });
        });

        httpServer.listen(PORT, () => {
            console.log(`=> Servidor corriendo en ${HOST}:${PORT}/api`);
        });
    } catch (err) {
        handleError(err, "/app.js -> setupServer");
    }
}

async function setupAPI() {
    try {
        await setupDB();
        await setupServer();
        await createRoles();
    } catch (err) {
        handleFatalError(err, "/app.js -> setupAPI");
    }
}

setupAPI()
    .then(() => console.log("=> API Iniciada exitosamente"))
    .catch((err) => handleFatalError(err, "/app.js -> setupAPI"));