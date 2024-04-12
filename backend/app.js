require('dotenv').config();
const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { setupDB } = require("./config/db.js");
const indexRoutes = require("./routes/index.routes.js");
const { PORT, HOST } = require("./config/configEnv.js");
const { handleFatalError, handleError } = require("./utils/errorHandler.js");

/**
 * Inicia el servidor web
 */
async function setupServer() {
    try {
        const server = express(); // Crea una instancia de express
        server.use(express.json());
        server.use(cors({ origin: "*" }));
        server.use(cookieParser());
        server.use(morgan("dev"));
        server.use(express.urlencoded({ extended: true }));
        server.use("/api", indexRoutes);

        server.use((err, req, res, next) => {
            // Error de análisis JSON (contenido incorrecto)
            if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
                return res.status(400).json({ message: "Error en formato de JSON" });
            }
            // Otros manejadores de errores aquí
        });

        // Inicia el servidor en el puerto especificado
        server.listen(PORT, () => {
            console.log(`=> Servidor corriendo en ${HOST}:${PORT}/api`);
        });
    } catch (err) {
        handleError(err, "/server.js -> setupServer");
    }
}

/**
 * Inicia la API
 */
async function setupAPI() {
    try {
        // Inicia la conexión a la base de datos
        await setupDB();
        // Inicia el servidor web
        await setupServer();
    } catch (err) {
        handleFatalError(err, "/server.js -> setupAPI");
    }
}

// Inicia la API
setupAPI()
    .then(() => console.log("=> API Iniciada exitosamente"))
    .catch((err) => handleFatalError(err, "/server.js -> setupAPI"));