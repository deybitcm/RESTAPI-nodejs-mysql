import { validaciónProducto, validaciónParcialProducto } from '../schemas/producto.js'

export class ProductController {
  constructor ({ productModel }) {
    this.productModel = productModel
  }

  obtenerProductos = async (req, res) => {
    const result = await this.productModel.getAll()
    const { status, ...response } = result
    return res.status(status).json(response)
  }

  obtenerProductosTienda = async (req, res) => {
    const { idtienda, isactive } = req.params
    const result = await this.productModel.getAllByStore({ id: idtienda, option: isactive })
    const { status, ...response } = result
    return res.status(status).json(response)
  }

  obtenerProducto = async (req, res) => {
    const { id } = req.params
    const result = await this.productModel.getById({ id })
    const { status, ...response } = result
    return res.status(status).json(response)
  }

  registrarProducto = async (req, res) => {
    const result = validaciónProducto(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.response) })
    }

    const consulta = await this.productModel.create({ input: result.data })
    const { status, ...response } = consulta
    return res.status(status).json(response)
  }

  actualizarProducto = async (req, res) => {
    const result = validaciónParcialProducto(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.response) })
    }

    const { id } = req.params
    const consulta = await this.productModel.update({ id, input: result.data })
    const { status, ...response } = consulta
    return res.status(status).json(response)
  }

  eliminarProducto = async (req, res) => {
    const { id } = req.params
    const { status, ...response } = await this.productModel.delete({ id })
    return res.status(status).json(response)
  }
}
