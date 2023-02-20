import { Request, Response, NextFunction } from 'express'
import catchAsync from '../../common/error-handler/CatchAsyncError'
import Constant from '../../constant'
import Order from './order.model'
import User from '../user/user.model'
import Product from '../product/product.model'

const Messages = Constant.messages

class orderController {
  createProductHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { payload } = res.locals

      const newOrder = new Order({
        orderItems: req.body.orderItems.map((x: any) => ({
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
      })
      const order = await newOrder.save()
      res.status(201).send({ message: Messages.orderCreated, order })
    },
  )
  getOrderMineHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { payload } = res.locals
      const orders = await Order.find({ user: payload._id })
      res.send(orders)
    },
  )

  getOrderByIdHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params
      const order = await Order.findById(id)
      if (order) {
        res.send(order)
      } else {
        res.status(404).send({ message: Messages.orderExist })
      }
    },
  )

  getOrderAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find().populate('user', 'name');
    res.send(orders);
  })

  updateOrderHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params
      const order = await Order.findById(id)
      if (order) {
        order.isPaid = true
        order.paidAt = new Date()
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.email_address,
        }
        const updateOrder = await order.save()
        res.send({ message: 'Order Paid', order: updateOrder })
      } else {
        res.status(404).send({ message: 'Order not Found' })
      }
    },
  )

  summaryHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const orders = await Order.aggregate([
        {
          $group: {
            _id: null,
            numOrders: { $sum: 1 },
            totalSales: { $sum: '$totalPrice' },
          },
        },
      ])
      const users = await User.aggregate([
        {
          $group: {
            _id: null,
            numUsers: { $sum: 1 },
          },
        },
      ])
      const dailyOrders = await Order.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            orders: { $sum: 1 },
            sales: { $sum: '$totalPrice' },
          },
        },
        { $sort: { _id: 1 } },
      ])
      const productCategories = await Product.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
      ])
      res.send({ users, orders, dailyOrders, productCategories })
    },
  )
}

export default new orderController()
