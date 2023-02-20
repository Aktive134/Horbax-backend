import { Router } from 'express'
import orderController from './order.controller'
import validateAdmin from '../../middleware/validate-admin'

const { createProductHandler, getOrderByIdHandler, updateOrderHandler, getOrderMineHandler, summaryHandler, getOrderAdmin } = orderController

const orderRouter = Router()

orderRouter.route("/orders").get(validateAdmin, getOrderAdmin).post(createProductHandler);
orderRouter.route("/orders/summary").get(validateAdmin, summaryHandler);
orderRouter.route("/orders/mine").get(getOrderMineHandler);
orderRouter.route("/orders/:id").get(getOrderByIdHandler);
orderRouter.route("/orders/:id/pay").put(updateOrderHandler);


export default orderRouter