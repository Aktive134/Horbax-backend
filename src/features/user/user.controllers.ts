import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import User from '../user/user.model'
import Constant from '../../constant'
import Configuration from '../../config'
import catchAsync from '../../common/error-handler/CatchAsyncError'
import ApplicationError from '../../common/error-handler/ApplicationError'
import generateToken from '../../lib/generate-token'

const Messages = Constant.messages

class UserController {
  updateUserHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { payload } = res.locals
      const { name, email, password } = req.body
      const user = await User.findById(payload._id)

      if (user) {
        user.name = name || user.name
        user.email = email || user.email

        if (password) {
          const salt = await bcrypt.genSalt(Configuration.saltFactor)
          const hashPassword = await bcrypt.hash(password, salt)
          user.password = hashPassword
        }

        const updatedUser = await user.save()
        const token = generateToken(updatedUser) as string
        const { isAdmin } = updatedUser
        res.status(201).send({ updatedUser, name, email, isAdmin, token })
      } else {
        return next(new ApplicationError(Messages.userNotFound))
      }
    },
  )

  getUserAdmin = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await User.find({})
      res.send(users)
    },
  )
}

export default new UserController()
