export class AuthController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  login = async (req, res) => {
    const { email, password } = req.body
    const result = await this.userModel.login({ email, password })
    if (result) {
      return res.status(200).json({ mensaje: 'Inicio de sesión exitoso' })
    }
    res.status(401).json({ mensaje: 'Credenciales incorrectas' })
  }

  register = async (req, res) => {
    const result = await this.userModel.register({ input: req.body })
    if (result) {
      return res.status(201).json({ mensaje: 'Usuario creado' })
    }
    res.status(400).json({ mensaje: 'Error al crear usuario' })
  }
}
