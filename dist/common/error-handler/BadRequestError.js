"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = __importDefault(require("../../constant"));
const BaserError_1 = __importDefault(require("./BaserError"));
class BadRequestError extends BaserError_1.default {
    constructor(msg) {
        super(msg);
        Object.setPrototypeOf(this, BadRequestError.prototype);
        this.name = constant_1.default.errorName.badRequest;
        this.statusCode = constant_1.default.statusCode.BAD_REQUEST;
        this.message = msg;
    }
}
exports.default = BadRequestError;
