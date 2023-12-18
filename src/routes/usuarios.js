import { Router } from 'express'
import { UserController } from '../controllers/usuarios.js'

export const createUserRouter = ({ userModel }) => {
  const userRouter = Router()

  const userController = new UserController({ userModel })

  userRouter.get('/', userController.obtenerUsuarios)
  userRouter.post('/', userController.registrarUsuario)

  userRouter.get('/:id', userController.obtenerUsuario)
  userRouter.patch('/:id', userController.actualizarUsuario)
  userRouter.delete('/:id', userController.eliminarUsuario)

  return userRouter
}
