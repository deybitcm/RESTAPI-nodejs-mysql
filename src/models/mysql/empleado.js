import { pool } from './db-connection.js'

export class EmployeeModel {
  static async getAll () {
    const [rows] = await pool.query('SELECT * FROM empleado')
    return rows
  }

  static async getById ({ id }) {
    const [row] = await pool.query('SELECT * FROM empleado WHERE id_empleado = ?', [id])
    if (row[0] != null) {
      return row[0]
    }
    return false
  }

  static async create ({ input }) {
    // id: prd_id: randomUUID()
    const newEmployee = {
      ...input
    }

    const [{ insertId }] = await pool.query('INSERT INTO empleado set ?', [newEmployee])

    const [nuevoEmpleado] = await pool.query('SELECT * FROM empleado WHERE id_empleado = ?', [insertId])

    return nuevoEmpleado
  }

  static async update ({ id, input }) {
    const consulta = await EmployeeModel.getById({ id })
    if (!consulta) {
      return false
    }

    const valoresNuevos = { ...input }

    await pool.query('UPDATE empleado SET ? WHERE id_empleado = ?', [valoresNuevos, id])

    const [empleadoEditado] = await pool.query('SELECT * FROM empleado WHERE id_empleado = ?', [id])

    return empleadoEditado
  }

  static async delete ({ id }) {
    const consulta = await EmployeeModel.getById({ id })
    if (!consulta) {
      return false
    }
    await pool.query('DELETE FROM empleado WHERE id_empleado = ?', [id])
    return true
  }
}
