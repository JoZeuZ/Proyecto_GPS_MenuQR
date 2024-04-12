const Plato = require('../models/platos.model');
const {handleError} = require('../utils/errorHandler');

async function getPlatos() {
    try {
        const platos = await Plato.find()
            .exec();
        if (!platos) return [null, "No hay platos"];

        return [platos, null];
    } catch (error) {
        handleError(error, "platos.service -> getPlatos");
    }
}

// module.exports = router;
module.exports = {
    getPlatos,
};