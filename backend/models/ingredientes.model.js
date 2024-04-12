const { model, Schema } = require('mongoose');

const ingredienteSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
});

module.exports = model('ingrediente', ingredienteSchema);