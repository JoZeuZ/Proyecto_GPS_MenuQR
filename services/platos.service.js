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



// router.post('/', async (req, res) => {
//     try {
//         const plato = new Plato(req.body);
//         const platoGuardado = await plato.save();
//         res.json(platoGuardado);
//     } catch (error) {
//         res.json({ error: error.message });
//     }
// })

// module.exports = router;
module.exports = {
    getPlatos,

};