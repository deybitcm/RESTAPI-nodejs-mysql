export class AuthController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  register = async (req, res) => {
    const result = await this.userModel.register({ input: req.body })
    if (result) {
      res.cookie('token', result.token)
      return res.status(201).json({ mensaje: 'Usuario creado' })
    }
    res.status(500).json({ mensaje: 'Error al crear usuario' })
  }

  login = async (req, res) => {
    const result = await this.userModel.login({ input: req.body })
    if (result) {
      res.cookie('token', result.token)
      return res.status(200).json({ mensaje: 'Inicio de sesión exitoso' })
    }
    res.status(401).json({ mensaje: 'Credenciales incorrectas' })
  }

  logout = async (req, res) => {
    const result = await this.userModel.logout()
    if (result) {
      res.clearCookie('token')
      return res.status(200).json({ mensaje: 'Cierre de sesión exitoso' })
    }
    res.status(500).json({ mensaje: 'Error al cerrar sesión' })
  }

  profile = async (req, res) => {
    const result = await this.userModel.profile({ input: req.user })
    if (result) {
      return res.status(200).json({ mensaje: 'Perfil encontrado', usuario: result })
    }
    res.status(500).json({ mensaje: 'Error al obtener perfil' })
  }
}
