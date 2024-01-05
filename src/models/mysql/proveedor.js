import { pool } from './db-connection.js'

export class SupplierModel {
  static async getAll () {
    const [rows] = await pool.query('SELECT * FROM proveedor')
    return rows
  }

  static async getById ({ id }) {
    const [row] = await pool.query('SELECT * FROM proveedor WHERE id_proveedor = ?', [id])
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

    const [{ insertId }] = await pool.query('INSERT INTO proveedor set ?', [newEmployee])

    const [nuevoRegistro] = await pool.query('SELECT * FROM proveedor WHERE id_proveedor = ?', [insertId])

    return nuevoRegistro
  }

  static async update ({ id, input }) {
    const consulta = await SupplierModel.getById({ id })
    if (!consulta) {
      return false
    }

    const valoresNuevos = { ...input }

    await pool.query('UPDATE proveedor SET ? WHERE id_proveedor = ?', [valoresNuevos, id])

    const [nuevoRegistro] = await pool.query('SELECT * FROM proveedor WHERE id_proveedor = ?', [id])

    return nuevoRegistro
  }

  static async delete ({ id }) {
    const consulta = await SupplierModel.getById({ id })
    if (!consulta) {
      return false
    }
    await pool.query('DELETE FROM proveedor WHERE id_proveedor = ?', [id])
    return true
  }
}
