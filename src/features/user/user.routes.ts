import { Router } from 'express'
import userControllers from './user.controllers'
import validateAdmin from '../../middleware/validate-admin'

const userRouter = Router()

const { updateUserHandler, getUserAdmin } = userControllers

userRouter.put('/users/profile', updateUserHandler)
userRouter.route('/users').get(validateAdmin, getUserAdmin)

export default userRouter
