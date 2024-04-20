"use strict";
function respondSuccess(req, res, statusCode = 200, data = {}) {
    return res.status(statusCode).json({
        state: "Success",
        data,
    });
}

function respondError(
    req,
    res,
    statusCode = 500,
    message = "Couldnt process the request",
    details = {},
){
    return res.status(statusCode).json({
        state: "Error",
        message,
        details,
    });
}

function respondInternalError(
    req,
    res,
    statusCode = 500,
    message = "Couldnt process the request",
){
    return res.status(statusCode).json({
        state: "Error",
        message,
    });
}

module.exports = { respondSuccess, respondError, respondInternalError };