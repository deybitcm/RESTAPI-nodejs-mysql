import { pool } from './db-conection.js'

export class EmployeeModel {
  static async getAll () {
    const [rows] = await pool.query('SELECT * FROM empleado')
    return rows
  }

  static async getById ({ id }) {
    const [row] = await pool.query('SELECT * FROM empleado WHERE emp_id = ?', [id])
    if (row[0] != null) {
      return row[0]
    }
    return false
  }

  static async create ({ input }) {
    // id: prd_id: randomUUID()
    const newProduct = {
      ...input
    }

    await pool.query('INSERT INTO empleado set ?', [newProduct])

    const [nuevoProducto] = await pool.query('SELECT * FROM empleado ORDER BY emp_id DESC limit 1')

    return nuevoProducto
  }

  static async update ({ id, input }) {
    const consulta = await EmployeeModel.getById({ id })
    if (!consulta) {
      return false
    }

    const valoresNuevos = { ...input }

    await pool.query('UPDATE empleado SET ? WHERE emp_id = ?', [valoresNuevos, id])

    const [nuevoProducto] = await pool.query('SELECT * FROM empleado WHERE emp_id = ?', [id])

    return nuevoProducto
  }

  static async delete ({ id }) {
    const consulta = await EmployeeModel.getById({ id })
    if (!consulta) {
      return false
    }
    await pool.query('DELETE FROM empleado WHERE emp_id = ?', [id])
    return true
  }
}
