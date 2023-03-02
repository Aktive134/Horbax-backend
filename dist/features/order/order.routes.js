"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = __importDefault(require("./order.controller"));
const validate_admin_1 = __importDefault(require("../../middleware/validate-admin"));
const { createProductHandler, getOrderByIdHandler, updateOrderHandler, getOrderMineHandler, summaryHandler, getOrderAdmin } = order_controller_1.default;
const orderRouter = (0, express_1.Router)();
orderRouter.route("/orders").get(validate_admin_1.default, getOrderAdmin).post(createProductHandler);
orderRouter.route("/orders/summary").get(validate_admin_1.default, summaryHandler);
orderRouter.route("/orders/mine").get(getOrderMineHandler);
orderRouter.route("/orders/:id").get(getOrderByIdHandler);
orderRouter.route("/orders/:id/pay").put(updateOrderHandler);
exports.default = orderRouter;
