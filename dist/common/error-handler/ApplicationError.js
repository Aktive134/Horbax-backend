"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = __importDefault(require("../../constant"));
const BaserError_1 = __importDefault(require("./BaserError"));
class ApplicationError extends BaserError_1.default {
    constructor(msg) {
        super(msg);
        Object.setPrototypeOf(this, ApplicationError.prototype);
        this.name = constant_1.default.errorName.serverError;
        this.statusCode = constant_1.default.statusCode.INTERNAL_SERVER_ERROR;
        this.message = msg;
    }
}
exports.default = ApplicationError;
