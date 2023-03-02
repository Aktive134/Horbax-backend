"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationError_1 = __importDefault(require("../../common/error-handler/ApplicationError"));
const CatchAsyncError_1 = __importDefault(require("../../common/error-handler/CatchAsyncError"));
const constant_1 = __importDefault(require("../../constant"));
const product_model_1 = __importDefault(require("./product.model"));
const Messages = constant_1.default.messages;
class productController {
    constructor() {
        this.createProductHandler = (0, CatchAsyncError_1.default)(async (req, res, next) => {
            const product = new product_model_1.default(req.body);
            await product.save();
            res.status(201).send(product);
        });
        this.getProductsHandler = (0, CatchAsyncError_1.default)(async (req, res, next) => {
            const products = await product_model_1.default.find({});
            if (!products) {
                return next(new ApplicationError_1.default(Messages.productExist));
            }
            return res.status(200).send(products);
        });
        this.getProductCategories = (0, CatchAsyncError_1.default)(async (req, res, next) => {
            const categories = await product_model_1.default.find().distinct('category');
            res.send(categories);
        });
        this.getProductBySlugHandler = (0, CatchAsyncError_1.default)(async (req, res, next) => {
            const { slug } = req.params;
            const product = await product_model_1.default.findOne({ slug });
            if (!product) {
                return res.status(404).send({ message: Messages.productExist });
            }
            return res.status(200).send(product);
        });
        this.getProductByIdHandler = (0, CatchAsyncError_1.default)(async (req, res, next) => {
            const { id } = req.params;
            const product = await product_model_1.default.findById({ _id: id });
            if (!product) {
                return res.status(404).send({ message: Messages.productExist });
            }
            return res.status(200).send(product);
        });
        this.searchHandler = (0, CatchAsyncError_1.default)(async (req, res, next) => {
            const PAGE_SIZE = 3;
            const { query } = req;
            const pageSize = Number(query.pageSize) || PAGE_SIZE;
            const page = Number(query.page) || 1;
            const category = query.category || '';
            const price = query.price || '';
            const rating = query.rating || '';
            const order = query.order || '';
            const searchQuery = query.query || '';
            const queryFilter = searchQuery && searchQuery !== 'all'
                ? {
                    name: {
                        $regex: searchQuery,
                        $options: 'i',
                    },
                }
                : {};
            const categoryFilter = category && category !== 'all' ? { category } : {};
            const ratingFilter = rating && rating !== 'all'
                ? {
                    rating: {
                        $gte: Number(rating),
                    },
                }
                : {};
            const priceFilter = price && price !== 'all'
                ? {
                    price: {
                        $gte: Number(price.split('-')[0]),
                        $lte: Number(price.split('-')[1]),
                    },
                }
                : {};
            const sortOrder = order === 'featured'
                ? { featured: -1 }
                : order === 'lowest'
                    ? { price: 1 }
                    : order === 'highest'
                        ? { price: -1 }
                        : order === 'toprated'
                            ? { rating: -1 }
                            : order === 'newest'
                                ? { createdAt: -1 }
                                : { _id: -1 };
            const products = await product_model_1.default.find({
                ...queryFilter,
                ...categoryFilter,
                ...priceFilter,
                ...ratingFilter,
            })
                .sort(sortOrder)
                .skip(pageSize * (page - 1))
                .limit(pageSize);
            const countProducts = await product_model_1.default.countDocuments({
                ...queryFilter,
                ...categoryFilter,
                ...priceFilter,
                ...ratingFilter,
            });
            res.send({
                products,
                countProducts,
                page,
                pages: Math.ceil(countProducts / pageSize),
            });
        });
        this.adminProductHandler = (0, CatchAsyncError_1.default)(async (req, res, next) => {
            const { query } = req;
            const PAGE_SIZE = 3;
            const page = Number(query.page) || 1;
            const pageSize = Number(query.pageSize) || PAGE_SIZE;
            const products = await product_model_1.default.find()
                .skip(pageSize * (page - 1))
                .limit(pageSize);
            const countProducts = await product_model_1.default.countDocuments();
            res.send({
                products,
                countProducts,
                page,
                pages: Math.ceil(countProducts / pageSize),
            });
        });
    }
}
exports.default = new productController();
