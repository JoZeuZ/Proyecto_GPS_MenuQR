"use strict";
function handleFatalError(error, msg) {
    console.log("[FATAL ERROR] Apagando servidor \n", msg);
    console.error(error);
    process.exit(1);
}

function handleError(error, msg) {
    console.log("❌ [ERROR] A ocurrido un error en: \n📁", msg);
    console.error("🗯  " + error.message);
}

module.exports = {
    handleFatalError,
    handleError,
};
