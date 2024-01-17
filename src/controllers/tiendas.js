import { validaciónTienda, validaciónParcialTienda } from '../schemas/tienda.js'

export class StoreController {
  constructor ({ storeModel }) {
    this.storeModel = storeModel
  }

  obtenerTiendas = async (req, res) => {
    const result = await this.storeModel.getAll()
    res.status(200).json(result)
  }

  obtenerTienda = async (req, res) => {
    const { id } = req.params
    const result = await this.storeModel.getById({ id })
    if (result) return res.status(200).json(result)
    res.status(404).json({ mensaje: 'Tienda no encontrado' })
  }

  obtenerTiposDeTienda = async (req, res) => {
    const result = await this.storeModel.getTypesOfStore()
    res.status(result.status).json(result)
  }

  registrarTienda = async (req, res) => {
    const result = validaciónTienda(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const nuevaTienda = await this.storeModel.create({ input: result.data })
    if (!nuevaTienda) {
      return res.status(500).json({ mensaje: 'Error al crear tienda' })
    }
    res.status(201).json(nuevaTienda)
  }

  actualizarTienda = async (req, res) => {
    const result = validaciónParcialTienda(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const tiendaEditada = await this.storeModel.update({ id, input: result.data })
    if (tiendaEditada) {
      return res.status(201).json(tiendaEditada)
    }
    res.status(404).json({ mensaje: 'Tienda no encontrado' })
  }

  eliminarTienda = async (req, res) => {
    const { id } = req.params
    const mensaje = await this.storeModel.delete({ id })
    if (mensaje) {
      return res.status(201).json({ mensaje: 'Tienda eliminado' })
    }
    res.status(404).json({ mensaje: 'Tienda no encontrado' })
  }
}
