import { Router } from 'express'
import { ProductController } from '../controllers/productos.js'
import { CategoryController } from '../controllers/categoria-productos.js'

export const createProductRouter = ({ productModel, categoryModel }) => {
  const productRouter = Router()

  const productController = new ProductController({ productModel })
  const categoryController = new CategoryController({ categoryModel })

  // Productos
  productRouter.get('/', productController.obtenerProductos)
  productRouter.post('/', productController.registrarProducto)

  productRouter.get('/:id', productController.obtenerProducto)
  productRouter.patch('/:id', productController.actualizarProducto)
  productRouter.delete('/:id', productController.eliminarProducto)

  // Categorías de productos
  productRouter.get('/categorias', categoryController.obtenerCategorias)
  productRouter.post('/categorias', categoryController.registrarCategoria)

  productRouter.get('/categorias/:id', categoryController.obtenerCategoria)
  productRouter.patch('/categorias/:id', categoryController.actualizarCategoria)
  productRouter.delete('/categorias/:id', categoryController.eliminarCategoria)

  return productRouter
}
