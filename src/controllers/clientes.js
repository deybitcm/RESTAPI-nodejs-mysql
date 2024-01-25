// import { validaciónPersona, validaciónParcialPersona } from '../schemas/persona.js'

export class ClientController {
  constructor ({ clientModel }) {
    this.clientModel = clientModel
  }

  obtenerClientes = async (req, res) => {
    const consulta = await this.clientModel.getAll()
    return res.status(consulta.status).json(consulta)
  }

  obtenerCliente = async (req, res) => {
    const { id } = req.params
    const consulta = await this.clientModel.getById({ id })
    return res.status(consulta.status).json(consulta)
  }

  obtenerClientesPorTienda = async (req, res) => {
    const { idTienda: id } = req.params
    const consulta = await this.clientModel.getAllByStore({ id })
    return res.status(consulta.status).json(consulta)
  }

  registrarCliente = async (req, res) => {
    // const result = validaciónPersona(req.body)
    // if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })
    const consulta = await this.clientModel.create({ input: req.body })
    return res.status(consulta.status).json(consulta)
  }

  actualizarCliente = async (req, res) => {
    // const result = validaciónParcialPersona(req.body)
    // if (!result.success) {
    //   return res.status(400).json({ error: JSON.parse(result.error.message) })
    // }

    const { id } = req.params
    const consulta = await this.clientModel.update({ id, input: req.body })
    return res.status(consulta.status).json(consulta)
  }

  eliminarCliente = async (req, res) => {
    const consulta = await this.clientModel.delete({ input: req.body })
    return res.status(consulta.status).json(consulta)
  }
}
