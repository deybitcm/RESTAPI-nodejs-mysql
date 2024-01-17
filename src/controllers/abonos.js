import { validaciónAbono, validaciónParcialAbono } from '../schemas/abono.js'

export class PaymentController {
  constructor ({ paymentModel }) {
    this.paymentModel = paymentModel
  }

  obtenerAbonos = async (req, res) => {
    const result = await this.paymentModel.getAll()
    const { status, ...response } = result
    res.status(status).json(response)
  }

  obtenerAbonosMovimiento = async (req, res) => {
    const { id } = req.params
    const { option } = req?.body
    const result = await this.paymentModel.getByMovementId({ id, option })
    const { status, ...response } = result
    res.status(status).json(response)
  }

  obtenerAbonosTipoMovimiento = async (req, res) => {
    const { option } = req?.body
    const result = await this.paymentModel.getByTypeOfMovement({ option })
    const { status, ...response } = result
    res.status(status).json(response)
  }

  obtenerAbono = async (req, res) => {
    const { id } = req.params
    const result = await this.paymentModel.getById({ id })
    const { status, ...response } = result
    res.status(status).json(response)
  }

  registrarAbono = async (req, res) => {
    const result = validaciónAbono(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const nuevoRegistro = await this.paymentModel.create({ input: result.data })
    const { status, ...response } = nuevoRegistro
    res.status(status).json(response)
  }

  actualizarAbono = async (req, res) => {
    const result = validaciónParcialAbono(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const nuevoRegistro = await this.paymentModel.update({ id, input: result.data })
    const { status, ...response } = nuevoRegistro
    res.status(status).json(response)
  }

  eliminarAbono = async (req, res) => {
    const { id } = req.params
    const result = await this.paymentModel.delete({ id })
    const { status, ...response } = result
    res.status(status).json(response)
  }
}
