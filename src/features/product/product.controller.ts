import { Request, Response, NextFunction } from 'express'
import ApplicationError from '../../common/error-handler/ApplicationError'
import catchAsync from '../../common/error-handler/CatchAsyncError'
import Constant from '../../constant'
import Product from './product.model'

const Messages = Constant.messages
class productController {
  createProductHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const product = new Product(req.body)
      await product.save()
      res.status(201).send(product)
    },
  )

  getProductsHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const products = await Product.find({})
      if (!products) {
        return next(new ApplicationError(Messages.productExist))
      }
      return res.status(200).send(products)
    },
  )

  getProductCategories = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const categories = await Product.find().distinct('category')
      res.send(categories)
    },
  )

  getProductBySlugHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { slug } = req.params
      const product = await Product.findOne({ slug })
      if (!product) {
        return res.status(404).send({ message: Messages.productExist })
      }
      return res.status(200).send(product)
    },
  )

  getProductByIdHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params
      const product = await Product.findById({ _id: id })
      if (!product) {
        return res.status(404).send({ message: Messages.productExist })
      }
      return res.status(200).send(product)
    },
  )

  searchHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const PAGE_SIZE = 3
      const { query } = req
      const pageSize = Number(query.pageSize) || PAGE_SIZE
      const page = Number(query.page) || 1
      const category = query.category || ''
      const price = query.price || ''
      const rating = query.rating || ''
      const order = query.order || ''
      const searchQuery = query.query || ''

      const queryFilter =
        searchQuery && searchQuery !== 'all'
          ? {
              name: {
                $regex: searchQuery,
                $options: 'i',
              },
            }
          : {}
      const categoryFilter = category && category !== 'all' ? { category } : {}

      const ratingFilter =
        rating && rating !== 'all'
          ? {
              rating: {
                $gte: Number(rating),
              },
            }
          : {}
  
      const priceFilter =
        price && price !== 'all'
          ? {
              price: {
                $gte: Number((<any>price).split('-')[0]),
                $lte: Number((<any>price).split('-')[1]),
              },
            }
          : {}

      const sortOrder =
        order === 'featured'
          ? { featured: -1 }
          : order === 'lowest'
          ? { price: 1 }
          : order === 'highest'
          ? { price: -1 }
          : order === 'toprated'
          ? { rating: -1 }
          : order === 'newest'
          ? { createdAt: -1 }
          : { _id: -1 }

      const products = await Product.find({
        ...queryFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter,
      })
        .sort(<any>sortOrder)
        .skip(pageSize * (page - 1))
        .limit(pageSize)

      const countProducts = await Product.countDocuments({
        ...queryFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter,
      })
      res.send({
        products,
        countProducts,
        page,
        pages: Math.ceil(countProducts / pageSize),
      })
    },
  )

  adminProductHandler = catchAsync(async (req: Request, res: Response, next: NextFunction ) => {
    const { query } = req;
    const PAGE_SIZE = 3
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || PAGE_SIZE;

    const products = await Product.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await Product.countDocuments();
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
}

export default new productController()
