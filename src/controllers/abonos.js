import { validaciónAbono, validaciónParcialAbono } from '../schemas/abono.js'

export class PaymentController {
  constructor ({ paymentModel }) {
    this.paymentModel = paymentModel
  }

  obtenerAbonos = async (req, res) => {
    const result = await this.paymentModel.getAll()
    res.status(200).json(result)
  }

  obtenerAbonosMovimiento = async (req, res) => {
    const { id } = req.params
    const result = await this.paymentModel.getByMovementId({ id })
    res.status(200).json(result)
  }

  obtenerAbono = async (req, res) => {
    const { id } = req.params
    const result = await this.paymentModel.getById({ id })
    if (result) return res.status(200).json(result)
    res.status(404).json({ mensaje: 'item no encontrado' })
  }

  registrarAbono = async (req, res) => {
    const result = validaciónAbono(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const nuevoRegistro = await this.paymentModel.create({ input: result.data })
    if (!nuevoRegistro) {
      return res.status(500).json({ mensaje: 'Error al crear item' })
    }
    res.status(201).json(nuevoRegistro)
  }

  actualizarAbono = async (req, res) => {
    const result = validaciónParcialAbono(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const nuevoRegistro = await this.paymentModel.update({ id, input: result.data })
    if (nuevoRegistro) {
      return res.status(201).json(nuevoRegistro)
    }
    res.status(404).json({ mensaje: 'item no encontrado' })
  }

  eliminarAbono = async (req, res) => {
    const { id } = req.params
    const mensaje = await this.paymentModel.delete({ id })
    if (mensaje) {
      return res.status(201).json({ mensaje: 'item eliminado' })
    }
    res.status(404).json({ mensaje: 'item no encontrado' })
  }
}
