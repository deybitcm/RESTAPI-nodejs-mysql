import { validaciónPersona, validaciónParcialPersona } from '../schemas/persona.js'

export class CollaboratorController {
  constructor ({ collaboratorModel }) {
    this.collaboratorModel = collaboratorModel
  }

  obtenerColaboradores = async (req, res) => {
    const result = await this.collaboratorModel.getAll()
    res.status(200).json(result)
  }

  obtenerColaborador = async (req, res) => {
    const { id } = req.params
    const result = await this.collaboratorModel.getById({ id })
    if (result) return res.status(200).json(result)
    res.status(404).json({ mensaje: 'Colaborador no encontrado' })
  }

  registrarColaborador = async (req, res) => {
    const result = validaciónPersona(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const nuevoColaborador = await this.collaboratorModel.create({ input: result.data })
    if (!nuevoColaborador) {
      return res.status(500).json({ mensaje: 'Error al crear Colaborador' })
    }
    res.status(201).json(nuevoColaborador)
  }

  actualizarColaborador = async (req, res) => {
    const result = validaciónParcialPersona(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const colaboradorEditado = await this.collaboratorModel.update({ id, input: result.data })
    if (colaboradorEditado) {
      return res.status(201).json(colaboradorEditado)
    }
    res.status(404).json({ mensaje: 'Colaborador no encontrado' })
  }

  eliminarColaborador = async (req, res) => {
    const { id } = req.params
    const mensaje = await this.collaboratorModel.delete({ id })
    if (mensaje) {
      return res.status(201).json({ mensaje: 'Colaborador eliminado' })
    }
    res.status(404).json({ mensaje: 'Colaborador no encontrado' })
  }
}
