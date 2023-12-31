import { Router } from 'express'
import { CollaboratorController } from '../controllers/colaboradores.js'

export const createCollaboratorRouter = ({ collaboratorModel }) => {
  const collaboratorRouter = Router()

  const collaboratorController = new CollaboratorController({ collaboratorModel })

  collaboratorRouter.get('/', collaboratorController.obtenerColaboradores)
  collaboratorRouter.post('/', collaboratorController.registrarColaborador)

  collaboratorRouter.get('/:id', collaboratorController.obtenerColaborador)
  collaboratorRouter.patch('/:id', collaboratorController.actualizarColaborador)
  collaboratorRouter.delete('/:id', collaboratorController.eliminarColaborador)

  return collaboratorRouter
}
