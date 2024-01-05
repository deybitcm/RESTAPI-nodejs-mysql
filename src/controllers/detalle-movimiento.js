import { validaciónDetalleMovimiento, validaciónParcialDetalleMovimiento } from '../schemas/detalle-movimiento.js'

export class MovementDetailController {
  constructor ({ movementDetailModel }) {
    this.movementDetailModel = movementDetailModel
  }

  obtenerDetalles = async (req, res) => {
    const result = await this.movementDetailModel.getAll()
    res.status(200).json(result)
  }

  obtenerDetalle = async (req, res) => {
    const { id } = req.params
    const result = await this.movementDetailModel.getById({ id })
    if (result) return res.status(200).json(result)
    res.status(404).json({ mensaje: 'item no encontrado' })
  }

  registrarDetalle = async (req, res) => {
    const result = validaciónDetalleMovimiento(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const nuevoRegistro = await this.movementDetailModel.create({ input: result.data })
    if (!nuevoRegistro) {
      return res.status(500).json({ mensaje: 'Error al crear item' })
    }
    res.status(201).json(nuevoRegistro)
  }

  actualizarDetalle = async (req, res) => {
    const result = validaciónParcialDetalleMovimiento(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const nuevoRegistro = await this.movementDetailModel.update({ id, input: result.data })
    if (nuevoRegistro) {
      return res.status(201).json(nuevoRegistro)
    }
    res.status(404).json({ mensaje: 'item no encontrado' })
  }

  eliminarDetalle = async (req, res) => {
    const { id } = req.params
    const mensaje = await this.movementDetailModel.delete({ id })
    if (mensaje) {
      return res.status(201).json({ mensaje: 'item eliminado' })
    }
    res.status(404).json({ mensaje: 'item no encontrado' })
  }
}
