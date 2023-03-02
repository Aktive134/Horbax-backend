"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response = (res, body) => {
    return res.status(body.statusCode).json(body);
};
exports.default = response;
