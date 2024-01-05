import { validaciónMovimiento, validaciónParcialMovimiento } from '../schemas/movimiento.js'

export class PurchaseController {
  constructor ({ purchaseModel }) {
    this.purchaseModel = purchaseModel
  }

  obtenerCompras = async (req, res) => {
    const result = await this.purchaseModel.getAll()
    res.status(200).json(result)
  }

  obtenerCompra = async (req, res) => {
    const { id } = req.params
    const result = await this.purchaseModel.getById({ id })
    if (result) return res.status(200).json(result)
    res.status(404).json({ mensaje: 'item no encontrado' })
  }

  registrarCompra = async (req, res) => {
    const result = validaciónMovimiento(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const nuevoRegistro = await this.purchaseModel.create({ input: result.data })
    if (!nuevoRegistro) {
      return res.status(500).json({ mensaje: 'Error al crear item' })
    }
    res.status(201).json(nuevoRegistro)
  }

  actualizarCompra = async (req, res) => {
    const result = validaciónParcialMovimiento(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const nuevoRegistro = await this.purchaseModel.update({ id, input: result.data })
    if (nuevoRegistro) {
      return res.status(201).json(nuevoRegistro)
    }
    res.status(404).json({ mensaje: 'item no encontrado' })
  }

  eliminarCompra = async (req, res) => {
    const { id } = req.params
    const mensaje = await this.purchaseModel.delete({ id })
    if (mensaje) {
      return res.status(201).json({ mensaje: 'item eliminado' })
    }
    res.status(404).json({ mensaje: 'item no encontrado' })
  }
}
