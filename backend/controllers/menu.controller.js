"use strict";

const { model, Schema } = require('mongoose');

const menuSchema = new Schema({
    productos: [
        { // mongoose.Schema.Types.ObjectId
            type: String,
            ref: "productos"
        }
    ]
});

module.exports = model('menu', menuSchema);