import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import User from '../user/user.model'
import Constant from '../../constant'
import Configuration from '../../config'
import catchAsync from '../../common/error-handler/CatchAsyncError'
import ApplicationError from '../../common/error-handler/ApplicationError'
import BadRequestError from '../../common/error-handler/BadRequestError'
import NotAuthorizeError from '../../common/error-handler/NotAuthorizedError'
import generateToken from '../../lib/generate-token'

const Messages = Constant.messages

class AuthController {
  signUpHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { name, email, password, isAdmin } = req.body
      const data = {
        name,
        email,
        password,
        isAdmin,
      }
      const newUser = new User(data)
      const salt = await bcrypt.genSalt(Configuration.saltFactor)
      const hashPassword = await bcrypt.hash(data.password, salt)
      newUser.password = hashPassword

      const user = await newUser.save()
      const token = generateToken(user) as string
      res.status(201).send({ user, name, email, isAdmin, token })
    },
  )
  loginHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body
      if (!email || !password) {
        return next(new BadRequestError(Messages.unsuccessfulLogin))
      }
      const user = await User.findOne({ email }).select('+password')
      if (!user) {
        return next(new NotAuthorizeError('Invalid login credentials'))
      }
      const checkPassword = await bcrypt.compare(
        password,
        <string>user?.password,
      )
      if (!checkPassword) {
        return next(new NotAuthorizeError('Invalid login credentials'))
      }
      const { _id, name, isAdmin } = user
      const userTokenData: Record<string, any> = {
        _id,
        name,
        email,
        isAdmin,
      }
      const token = generateToken(userTokenData) as string
      res.status(200).send({
        _id,
        name,
        email,
        isAdmin,
        token,
      })
    },
  )
}

export default new AuthController()
