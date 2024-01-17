import { Router } from 'express'
import { CategoryController } from '../controllers/categoria-productos.js'

export const createCategoryRouter = ({ categoryModel }) => {
  const categoryRouter = Router()

  const categoryController = new CategoryController({ categoryModel })

  categoryRouter.get('/', categoryController.obtenerCategorias)
  categoryRouter.post('/', categoryController.registrarCategoria)

  categoryRouter.get('/:id', categoryController.obtenerCategoria)
  categoryRouter.patch('/:id', categoryController.actualizarCategoria)
  categoryRouter.delete('/:id', categoryController.eliminarCategoria)

  return categoryRouter
}
