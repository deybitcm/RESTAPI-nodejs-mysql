import { validaciónMovimiento, validaciónParcialMovimiento } from '../schemas/movimiento.js'

export class SaleController {
  constructor ({ saleModel }) {
    this.saleModel = saleModel
  }

  obtenerVentas = async (req, res) => {
    const result = await this.saleModel.getAll()
    res.status(200).json(result)
  }

  obtenerVenta = async (req, res) => {
    const { id } = req.params
    const result = await this.saleModel.getById({ id })
    if (result) return res.status(200).json(result)
    res.status(404).json({ mensaje: 'item no encontrado' })
  }

  registrarVenta = async (req, res) => {
    const result = validaciónMovimiento(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const nuevoRegistro = await this.saleModel.create({ input: result.data })
    if (!nuevoRegistro) {
      return res.status(500).json({ mensaje: 'Error al crear item' })
    }
    res.status(201).json(nuevoRegistro)
  }

  actualizarVenta = async (req, res) => {
    const result = validaciónParcialMovimiento(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const nuevoRegistro = await this.saleModel.update({ id, input: result.data })
    if (nuevoRegistro) {
      return res.status(201).json(nuevoRegistro)
    }
    res.status(404).json({ mensaje: 'item no encontrado' })
  }

  eliminarVenta = async (req, res) => {
    const { id } = req.params
    const mensaje = await this.saleModel.delete({ id })
    if (mensaje) {
      return res.status(201).json({ mensaje: 'item eliminado' })
    }
    res.status(404).json({ mensaje: 'item no encontrado' })
  }
}
