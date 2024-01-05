import { validaciónCategoria, validaciónParcialCategoria } from '../schemas/categoria-producto.js'

export class CategoryController {
  constructor ({ categoryModel }) {
    this.categoryModel = categoryModel
  }

  obtenerCategorias = async (req, res) => {
    const result = await this.categoryModel.getAll()
    res.status(200).json(result)
  }

  obtenerCategoria = async (req, res) => {
    const { id } = req.params
    const result = await this.categoryModel.getById({ id })
    if (result) return res.status(200).json(result)
    res.status(404).json({ mensaje: 'item no encontrado' })
  }

  registrarCategoria = async (req, res) => {
    const result = validaciónCategoria(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const nuevoRegistro = await this.categoryModel.create({ input: result.data })
    if (!nuevoRegistro) {
      return res.status(500).json({ mensaje: 'Error al crear item' })
    }
    res.status(201).json(nuevoRegistro)
  }

  actualizarCategoria = async (req, res) => {
    const result = validaciónParcialCategoria(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const nuevoRegistro = await this.categoryModel.update({ id, input: result.data })
    if (nuevoRegistro) {
      return res.status(201).json(nuevoRegistro)
    }
    res.status(404).json({ mensaje: 'item no encontrado' })
  }

  eliminarCategoria = async (req, res) => {
    const { id } = req.params
    const mensaje = await this.categoryModel.delete({ id })
    if (mensaje) {
      return res.status(201).json({ mensaje: 'item eliminado' })
    }
    res.status(404).json({ mensaje: 'item no encontrado' })
  }
}
