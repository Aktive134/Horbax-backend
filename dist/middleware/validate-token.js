"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const BadRequestError_1 = __importDefault(require("../common/error-handler/BadRequestError"));
const NotAuthorizedError_1 = __importDefault(require("../common/error-handler/NotAuthorizedError"));
const { JWT: { secret, subject, issuer }, } = config_1.default;
const validateToken = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (authorization === undefined || authorization === '') {
            return next(new BadRequestError_1.default('Provide Authorization header'));
        }
        let bearer;
        let token = '';
        if (authorization !== undefined) {
            [bearer, token] = authorization.split(' ');
        }
        if (bearer !== 'Bearer') {
            res.set('WWW-Authenticate', 'Basic realm= Access Token , charset=UTF-8');
            return next(new NotAuthorizedError_1.default('Bad Request: Invalid Authorization'));
        }
        const payload = jwt.verify(token, secret, {
            issuer,
            subject,
        });
        res.locals.payload = payload;
        res.locals.token = token;
        next();
    }
    catch (error) {
        return next(new BadRequestError_1.default("Something went wrong!"));
    }
};
exports.default = validateToken;
