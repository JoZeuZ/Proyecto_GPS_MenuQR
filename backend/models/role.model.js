"use strict";
const mongoose = require("mongoose");
const ROLES = require("../constants/roles.constants");

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            enum: ROLES,
            required: true,
        },
    },
    {
        versionKey: false,
    },
);

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;