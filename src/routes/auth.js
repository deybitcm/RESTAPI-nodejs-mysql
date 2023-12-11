import { Router } from 'express'
import { AuthController } from '../controllers/auth'

export const createAuthRouter = ({ userModel }) => {
  const authRouter = Router()

  const authController = new AuthController({ userModel })

  authRouter.post('/login', authController.login)
  authRouter.post('/register', authController.register)

  return authRouter
}
