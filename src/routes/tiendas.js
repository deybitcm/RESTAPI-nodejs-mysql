import { Router } from 'express'
import { StoreController } from '../controllers/tiendas.js'

export const createStoreRouter = ({ storeModel }) => {
  const storeRouter = Router()

  const storeController = new StoreController({ storeModel })

  storeRouter.get('/', storeController.obtenerTiendas)
  storeRouter.post('/', storeController.registrarTienda)

  storeRouter.get('/:id', storeController.obtenerTienda)
  storeRouter.patch('/:id', storeController.actualizarTienda)
  storeRouter.delete('/:id', storeController.eliminarTienda)

  return storeRouter
}
