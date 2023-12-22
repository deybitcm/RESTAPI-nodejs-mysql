import { Router } from 'express'
import { PersonController } from '../controllers/persona.js'

export const createPersonRouter = ({ personModel }) => {
  const personRouter = Router()

  const personController = new PersonController({ personModel })

  personRouter.get('/', personController.obtenerPersona)
  personRouter.post('/', personController.registrarPersona)

  personRouter.get('/:id', personController.obtenerPersonas)
  personRouter.patch('/:id', personController.actualizarPersona)
  personRouter.delete('/:id', personController.eliminarPersona)

  return personRouter
}
