import { Router } from 'express';
import validateAdmin from '../../middleware/validate-admin';
import productController from './product.controller';

const productRouter = Router();
const {
    getProductsHandler,
    getProductBySlugHandler,
    getProductByIdHandler,
    getProductCategories,
    searchHandler,
    createProductHandler,
    adminProductHandler
} = productController;

productRouter.route('/products').get(getProductsHandler).post(createProductHandler);
productRouter.get("/products/admin", adminProductHandler)
productRouter.get('/products/search', searchHandler)
productRouter.get('/products/categories', getProductCategories)
productRouter.route('/products/slug/:slug').get(getProductBySlugHandler);
productRouter.get('/products/:id', getProductByIdHandler);

export default productRouter;