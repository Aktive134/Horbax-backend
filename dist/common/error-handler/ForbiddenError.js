"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = __importDefault(require("../../constant"));
const BaserError_1 = __importDefault(require("./BaserError"));
class ForbiddenError extends BaserError_1.default {
    constructor(msg) {
        super(msg);
        Object.setPrototypeOf(this, ForbiddenError.prototype);
        this.name = constant_1.default.errorName.forbidden;
        this.statusCode = constant_1.default.statusCode.FORBIDDEN;
        this.message = msg;
    }
}
exports.default = ForbiddenError;
