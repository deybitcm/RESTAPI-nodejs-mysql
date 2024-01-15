import { Router } from 'express'
import { UserController } from '../controllers/usuarios.js'
import { AuthController } from '../controllers/auth.js'
import { authRequired } from '../middlewares/validateToken.js'

export const createUserRouter = ({ userModel }) => {
  const userRouter = Router()

  const userController = new UserController({ userModel })
  const authController = new AuthController({ userModel })

  // Usuarios
  userRouter.get('/', userController.obtenerUsuarios)
  userRouter.post('/', userController.registrarUsuario)

  userRouter.get('/:id', userController.obtenerUsuario)
  userRouter.patch('/:id', userController.actualizarUsuario)
  userRouter.delete('/:id', userController.eliminarUsuario)

  // Autenticación
  userRouter.post('/auth/login', authController.login)
  userRouter.post('/auth/register', authController.register)
  userRouter.post('/auth/logout', authController.logout)
  userRouter.get('/auth/profile', authRequired, authController.profile)
  userRouter.post('/auth/verifyinit', authController.verifyInit)
  userRouter.post('/auth/verifycode', authController.verifyCode)

  return userRouter
}
