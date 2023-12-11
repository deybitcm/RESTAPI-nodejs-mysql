import { Router } from 'express'
import { AuthController } from '../controllers/auth.js'
import { authRequired } from '../middlewares/validateToken.js'

export const createAuthRouter = ({ userModel }) => {
  const authRouter = Router()

  const authController = new AuthController({ userModel })

  authRouter.post('/login', authController.login)
  authRouter.post('/register', authController.register)
  authRouter.post('/logout', authController.logout)
  authRouter.get('/profile', authRequired, authController.profile)

  return authRouter
}
