const Plato = require('../models/platos.model');

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

// router.get('/:platoID', async (req, res) => {
//     try {
//         const platoID = req.params.platoID;
//         const platos = await Plato.findById(platoID);
//         res.json(platos);
//     } catch (error) {
//         res.json({ error: error.message });
//     }
// });

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