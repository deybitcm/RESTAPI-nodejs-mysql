import { validaciónPersona, validaciónParcialPersona } from '../schemas/persona.js'

export class PersonController {
  constructor ({ personModel }) {
    this.personModel = personModel
  }

  obtenerPersonas = async (req, res) => {
    const result = await this.personModel.getAll()
    res.status(200).json(result)
  }

  obtenerPersona = async (req, res) => {
    const { id } = req.params
    const result = await this.personModel.getById({ id })
    if (result) return res.status(200).json(result)
    res.status(404).json({ mensaje: 'Persona no encontrado' })
  }

  registrarPersona = async (req, res) => {
    const result = validaciónPersona(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const nuevoPersona = await this.personModel.create({ input: result.data })
    res.status(201).json(nuevoPersona)
  }

  actualizarPersona = async (req, res) => {
    const result = validaciónParcialPersona(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const personaEditada = await this.personModel.update({ id, input: result.data })
    if (personaEditada) {
      return res.status(201).json(personaEditada)
    }
    res.status(404).json({ mensaje: 'Persona no encontrado' })
  }

  eliminarPersona = async (req, res) => {
    const { id } = req.params
    const mensaje = await this.personModel.delete({ id })
    if (mensaje) {
      return res.status(201).json({ mensaje: 'Persona eliminado' })
    }
    res.status(404).json({ mensaje: 'Persona no encontrado' })
  }
}
