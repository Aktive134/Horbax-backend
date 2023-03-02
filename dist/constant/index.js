"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import responses from "./response-messages"
const http_codes_1 = __importDefault(require("./http-codes"));
const error_name_1 = __importDefault(require("./error-name"));
const response_messages_1 = __importDefault(require("./response-messages"));
const Constant = {
    messages: response_messages_1.default,
    statusCode: http_codes_1.default,
    errorName: error_name_1.default,
};
exports.default = Constant;
