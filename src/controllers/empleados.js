import { validaciónEmpleado, validaciónParcialEmpleado } from '../schemas/empleado.js'

export class EmployeeController {
  constructor ({ employeeModel }) {
    this.employeeModel = employeeModel
  }

  obtenerEmpleados = async (req, res) => {
    const result = await this.employeeModel.getAll()
    res.status(200).json({ empleados: result })
  }

  obtenerEmpleado = async (req, res) => {
    const { id } = req.params
    const result = await this.employeeModel.getById({ id })
    if (result) return res.status(200).json({ empleado: result })
    res.status(404).json({ mensaje: 'Empleado no encontrado' })
  }

  registrarEmpleado = async (req, res) => {
    const result = validaciónEmpleado(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const [nuevoEmpleado] = await this.employeeModel.create({ input: result.data })
    res.status(201).json({ empleado_creado: nuevoEmpleado })
  }

  actualizarEmpleado = async (req, res) => {
    const result = validaciónParcialEmpleado(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const nuevoEmpleado = await this.employeeModel.update({ id, input: result.data })
    if (nuevoEmpleado) {
      return res.status(201).json({ empleado: nuevoEmpleado })
    }
    res.status(404).json({ mensaje: 'Empleado no encontrado' })
  }

  eliminarEmpleado = async (req, res) => {
    const { id } = req.params
    const mensaje = await this.employeeModel.delete({ id })
    if (mensaje) {
      return res.status(201).json({ mensaje: 'Empleado eliminado' })
    }
    res.status(404).json({ mensaje: 'Empleado no encontrado' })
  }
}
