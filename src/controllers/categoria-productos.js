import { validaciónCategoria, validaciónParcialCategoria } from '../schemas/categoria-producto.js'

export class CategoryController {
  constructor ({ categoryModel }) {
    this.categoryModel = categoryModel
  }

  obtenerCategorias = async (req, res) => {
    const result = await this.categoryModel.getAll()
    return res.status(result.status).json(result)
  }

  obtenerCategoria = async (req, res) => {
    const { id } = req.params
    const result = await this.categoryModel.getById({ id })
    return res.status(result.status).json(result)
  }

  registrarCategoria = async (req, res) => {
    const result = validaciónCategoria(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const consulta = await this.categoryModel.create({ input: result.data })
    return res.status(consulta.status).json(consulta)
  }

  actualizarCategoria = async (req, res) => {
    const result = validaciónParcialCategoria(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const consulta = await this.categoryModel.update({ id, input: result.data })
    return res.status(consulta.status).json(consulta)
  }

  eliminarCategoria = async (req, res) => {
    const { id } = req.params
    const consulta = await this.categoryModel.delete({ id })
    return res.status(consulta.status).json(consulta)
  }
}
