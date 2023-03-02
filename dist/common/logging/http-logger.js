"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const customFormat = (token, req, res) => {
    return [
        token["remote-addr"](req, res),
        token.date(req, res),
        token.method(req, res),
        "HTTP/",
        token["http-version"](req, res),
        token.url(req, res),
        token.status(req, res),
        "TTM",
        token["response-time"](req, res),
        "ms",
        "TRT",
        token["total-time"](req, res),
        "ms",
        token.res(req, res, "Content-length"),
        token["user-agent"](req, res)
    ].join(" ");
};
const httpLogger = (0, morgan_1.default)(customFormat, {
    immediate: false,
});
exports.default = httpLogger;
