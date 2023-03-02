"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_routes_1 = __importDefault(require("./features/product/product.routes"));
const auth_routes_1 = __importDefault(require("./features/auth/auth.routes"));
const order_routes_1 = __importDefault(require("./features/order/order.routes"));
const validate_token_1 = __importDefault(require("./middleware/validate-token"));
const user_routes_1 = __importDefault(require("./features/user/user.routes"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.status(200).json({
        message: "Service Running Ok",
        status: true,
        statusCode: 200,
        data: []
    });
});
router.use(auth_routes_1.default);
router.use(product_routes_1.default);
router.use(validate_token_1.default);
router.use(user_routes_1.default);
router.use(order_routes_1.default);
exports.default = router;
