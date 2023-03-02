"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CatchAsyncError_1 = __importDefault(require("../../common/error-handler/CatchAsyncError"));
const constant_1 = __importDefault(require("../../constant"));
const order_model_1 = __importDefault(require("./order.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
const Messages = constant_1.default.messages;
class orderController {
    constructor() {
        this.createProductHandler = (0, CatchAsyncError_1.default)(async (req, res, next) => {
            const { payload } = res.locals;
            const newOrder = new order_model_1.default({
                orderItems: req.body.orderItems.map((x) => ({
                    ...x,
                    product: x._id,
                })),
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: payload._id,
            });
            const order = await newOrder.save();
            res.status(201).send({ message: Messages.orderCreated, order });
        });
        this.getOrderMineHandler = (0, CatchAsyncError_1.default)(async (req, res, next) => {
            const { payload } = res.locals;
            const orders = await order_model_1.default.find({ user: payload._id });
            res.send(orders);
        });
        this.getOrderByIdHandler = (0, CatchAsyncError_1.default)(async (req, res, next) => {
            const { id } = req.params;
            const order = await order_model_1.default.findById(id);
            if (order) {
                res.send(order);
            }
            else {
                res.status(404).send({ message: Messages.orderExist });
            }
        });
        this.getOrderAdmin = (0, CatchAsyncError_1.default)(async (req, res, next) => {
            const orders = await order_model_1.default.find().populate('user', 'name');
            res.send(orders);
        });
        this.updateOrderHandler = (0, CatchAsyncError_1.default)(async (req, res, next) => {
            const { id } = req.params;
            const order = await order_model_1.default.findById(id);
            if (order) {
                order.isPaid = true;
                order.paidAt = new Date();
                order.paymentResult = {
                    id: req.body.id,
                    status: req.body.status,
                    update_time: req.body.update_time,
                    email_address: req.body.email_address,
                };
                const updateOrder = await order.save();
                res.send({ message: 'Order Paid', order: updateOrder });
            }
            else {
                res.status(404).send({ message: 'Order not Found' });
            }
        });
        this.summaryHandler = (0, CatchAsyncError_1.default)(async (req, res, next) => {
            const orders = await order_model_1.default.aggregate([
                {
                    $group: {
                        _id: null,
                        numOrders: { $sum: 1 },
                        totalSales: { $sum: '$totalPrice' },
                    },
                },
            ]);
            const users = await user_model_1.default.aggregate([
                {
                    $group: {
                        _id: null,
                        numUsers: { $sum: 1 },
                    },
                },
            ]);
            const dailyOrders = await order_model_1.default.aggregate([
                {
                    $group: {
                        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                        orders: { $sum: 1 },
                        sales: { $sum: '$totalPrice' },
                    },
                },
                { $sort: { _id: 1 } },
            ]);
            const productCategories = await product_model_1.default.aggregate([
                {
                    $group: {
                        _id: '$category',
                        count: { $sum: 1 },
                    },
                },
            ]);
            res.send({ users, orders, dailyOrders, productCategories });
        });
    }
}
exports.default = new orderController();
