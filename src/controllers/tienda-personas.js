import { validaciónTiendaPersona, validaciónParcialTiendaPersona } from '../schemas/tienda-persona.js'

export class StorePersonController {
  constructor ({ storePersonModel }) {
    this.storePersonModel = storePersonModel
  }

  obtenerRegistros = async (req, res) => {
    const result = await this.storePersonModel.getAll()
    res.status(200).json(result)
  }

  obtenerRegistro = async (req, res) => {
    const { storeId, personId } = req.params
    const result = await this.storePersonModel.getById({ storeId, personId })
    if (result) return res.status(200).json(result)
    res.status(404).json({ mensaje: 'item no encontrado' })
  }

  registrarRegistro = async (req, res) => {
    const result = validaciónTiendaPersona(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const nuevoRegistro = await this.storePersonModel.create({ input: result.data })
    if (!nuevoRegistro) {
      return res.status(500).json({ mensaje: 'Error al crear item' })
    }
    res.status(201).json(nuevoRegistro)
  }

  actualizarRegistro = async (req, res) => {
    const result = validaciónParcialTiendaPersona(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { storeId, personId } = req.params
    const nuevoRegistro = await this.storePersonModel.update({ storeId, personId, input: result.data })
    if (nuevoRegistro) {
      return res.status(201).json(nuevoRegistro)
    }
    res.status(404).json({ mensaje: 'item no encontrado' })
  }

  eliminarRegistro = async (req, res) => {
    const { storeId, personId } = req.params
    const mensaje = await this.storePersonModel.delete({ storeId, personId })
    if (mensaje) {
      return res.status(201).json({ mensaje: 'item eliminado' })
    }
    res.status(404).json({ mensaje: 'item no encontrado' })
  }
}
