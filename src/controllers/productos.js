import { validaciónProducto, validaciónParcialProducto } from '../schemas/producto.js'

export class ProductController {
  constructor ({ productModel }) {
    this.productModel = productModel
  }

  obtenerProductos = async (req, res) => {
    const result = await this.productModel.getAll()
    res.status(200).json(result)
  }

  obtenerProducto = async (req, res) => {
    const { id } = req.params
    const result = await this.productModel.getById({ id })
    if (result) return res.status(200).json({ producto: result })
    res.status(404).json({ mensaje: 'Producto no encontrado' })
  }

  registrarProducto = async (req, res) => {
    const result = validaciónProducto(req.body)
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const [nuevoProducto] = await this.productModel.create({ input: result.data })
    res.status(201).json({ producto_creado: nuevoProducto })
  }

  actualizarProducto = async (req, res) => {
    const result = validaciónParcialProducto(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const nuevoProducto = await this.productModel.update({ id, input: result.data })
    if (nuevoProducto) {
      return res.status(201).json({ producto: nuevoProducto })
    }
    res.status(404).json({ mensaje: 'Producto no encontrado' })
  }

  eliminarProducto = async (req, res) => {
    const { id } = req.params
    const mensaje = await this.productModel.delete({ id })
    if (mensaje) {
      return res.status(201).json({ mensaje: 'Producto eliminado' })
    }
    res.status(404).json({ mensaje: 'Producto no encontrado' })
  }
}
