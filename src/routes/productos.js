import { Router } from 'express'
import { ProductController } from '../controllers/productos.js'

export const createProductRouter = ({ productModel }) => {
  const productRouter = Router()

  const productController = new ProductController({ productModel })

  productRouter.get('/', productController.obtenerProductos)
  productRouter.post('/', productController.registrarProducto)

  productRouter.get('/:id', productController.obtenerProducto)
  productRouter.patch('/:id', productController.actualizarProducto)
  productRouter.delete('/:id', productController.eliminarProducto)

  return productRouter
}
