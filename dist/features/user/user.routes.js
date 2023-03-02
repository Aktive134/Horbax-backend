"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = __importDefault(require("./user.controllers"));
const validate_admin_1 = __importDefault(require("../../middleware/validate-admin"));
const userRouter = (0, express_1.Router)();
const { updateUserHandler, getUserAdmin } = user_controllers_1.default;
userRouter.put('/users/profile', updateUserHandler);
userRouter.route('/users').get(validate_admin_1.default, getUserAdmin);
exports.default = userRouter;
