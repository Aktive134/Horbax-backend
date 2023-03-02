"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    constructor(msg) {
        super(msg);
        Object.setPrototypeOf(this, BaseError.prototype);
        Error.captureStackTrace(this, BaseError);
    }
}
exports.default = BaseError;
