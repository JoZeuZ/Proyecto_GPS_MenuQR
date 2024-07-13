"use strict";
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Role = require("../models/role.model.js");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: Role,
            },
        ],
    },
    {
        versionKey: false,
    },
);

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;