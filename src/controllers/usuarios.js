import { validaciónUsuario, validaciónParcialUsuario } from '../schemas/usuario.js'

export class UserController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  obtenerUsuarios = async (req, res) => {
    const result = await this.userModel.getAll()
    res.status(200).json(result)
  }

  obtenerUsuario = async (req, res) => {
    const { id } = req.params
    const result = await this.userModel.getById({ id })
    if (result) return res.status(200).json(result)
    res.status(404).json({ mensaje: 'Usuario no encontrado' })
  }

  registrarUsuario = async (req, res) => {
    const result = validaciónUsuario(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const nuevoUsuario = await this.userModel.create({ input: result.data })
    if (!nuevoUsuario) {
      return res.status(500).json({ mensaje: 'Error al crear usuario' })
    }
    res.status(201).json(nuevoUsuario)
  }

  actualizarUsuario = async (req, res) => {
    const result = validaciónParcialUsuario(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const usuarioEditado = await this.userModel.update({ id, input: result.data })
    if (usuarioEditado) {
      return res.status(201).json(usuarioEditado)
    }
    res.status(404).json({ mensaje: 'Usuario no encontrado' })
  }

  eliminarUsuario = async (req, res) => {
    const { id } = req.params
    const mensaje = await this.userModel.delete({ id })
    if (mensaje) {
      return res.status(201).json({ mensaje: 'Usuario eliminado' })
    }
    res.status(404).json({ mensaje: 'Usuario no encontrado' })
  }
}
