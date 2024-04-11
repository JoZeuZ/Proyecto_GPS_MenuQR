const PlatoService = require("../services/platos.service");
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");


async function getPlatos(req, res) {
    try {
        const [platos, errorPlatos] = await PlatoService.getPlatos();
        if (errorPlatos) return respondError(req, res, 404, errorPlatos);

        platos.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, ["Los platos son: ", platos]);
    } catch (error) {
        handleError(error, "plato.controller -> getPlatos");
    }
}


module.exports = {
    getPlatos,
    // getPlatoById,
    // getPlatoByPostulacionId,
    // deletePlato,
};