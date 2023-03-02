"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("./product.controller"));
const productRouter = (0, express_1.Router)();
const { getProductsHandler, getProductBySlugHandler, getProductByIdHandler, getProductCategories, searchHandler, createProductHandler, adminProductHandler } = product_controller_1.default;
productRouter.route('/products').get(getProductsHandler).post(createProductHandler);
productRouter.get("/products/admin", adminProductHandler);
productRouter.get('/products/search', searchHandler);
productRouter.get('/products/categories', getProductCategories);
productRouter.route('/products/slug/:slug').get(getProductBySlugHandler);
productRouter.get('/products/:id', getProductByIdHandler);
exports.default = productRouter;
