"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const { signUpHandler, loginHandler } = auth_controller_1.default;
const authRouter = (0, express_1.Router)();
authRouter.post('/signup', signUpHandler);
authRouter.post('/signin', loginHandler);
exports.default = authRouter;
