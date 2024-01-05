import { validaciónPersona, validaciónParcialPersona } from '../schemas/persona.js'

export class ClientController {
  constructor ({ clientModel }) {
    this.clientModel = clientModel
  }

  obtenerClientes = async (req, res) => {
    const result = await this.clientModel.getAll()
    res.status(200).json(result)
  }

  obtenerCliente = async (req, res) => {
    const { id } = req.params
    const result = await this.clientModel.getById({ id })
    if (result) return res.status(200).json(result)
    res.status(404).json({ mensaje: 'item no encontrado' })
  }

  registrarCliente = async (req, res) => {
    const result = validaciónPersona(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const nuevoRegistro = await this.clientModel.create({ input: result.data })
    if (!nuevoRegistro) {
      return res.status(500).json({ mensaje: 'Error al crear item' })
    }
    res.status(201).json(nuevoRegistro)
  }

  actualizarCliente = async (req, res) => {
    const result = validaciónParcialPersona(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const nuevoRegistro = await this.clientModel.update({ id, input: result.data })
    if (nuevoRegistro) {
      return res.status(201).json(nuevoRegistro)
    }
    res.status(404).json({ mensaje: 'item no encontrado' })
  }

  eliminarCliente = async (req, res) => {
    const { id } = req.params
    const mensaje = await this.clientModel.delete({ id })
    if (mensaje) {
      return res.status(201).json({ mensaje: 'item eliminado' })
    }
    res.status(404).json({ mensaje: 'item no encontrado' })
  }
}
