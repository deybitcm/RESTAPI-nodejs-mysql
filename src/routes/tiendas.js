import { Router } from 'express'
import { StoreController } from '../controllers/tiendas.js'
import { StorePersonController } from '../controllers/tienda-personas.js'

export const createStoreRouter = ({ storeModel, storePersonModel }) => {
  const storeRouter = Router()

  const storeController = new StoreController({ storeModel })
  const storePersonController = new StorePersonController({ storePersonModel })

  // Tiendas
  storeRouter.get('/', storeController.obtenerTiendas)
  storeRouter.post('/', storeController.registrarTienda)

  storeRouter.get('/:id', storeController.obtenerTienda)
  storeRouter.patch('/:id', storeController.actualizarTienda)
  storeRouter.delete('/:id', storeController.eliminarTienda)

  // Tiendas - Personas
  storeRouter.get('/personas', storePersonController.obtenerRegistros)
  storeRouter.post('/personas', storePersonController.registrarRegistro)

  storeRouter.get('/personas/:storeId/:personId', storePersonController.obtenerRegistro)
  storeRouter.patch('/personas/:storeId/:personId', storePersonController.actualizarRegistro)
  storeRouter.delete('/personas/:storeId/:personId', storePersonController.eliminarRegistro)

  return storeRouter
}
