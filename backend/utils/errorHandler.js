"use strict";
function handleFatalError(error, msg) {
    console.log("[FATAL ERROR] Apagando servidor \n", msg);
    console.error(error);
    process.exit(1);
}

function handleError(error, msg) {
    console.log("❌ [ERROR] Ha ocurrido un error en: \n📁", msg);
    console.error("🗯  Mensaje de error: " + error.message);
    console.error("🗯  Stack trace: " + error.stack);
}

module.exports = {
    handleFatalError,
    handleError,
};
