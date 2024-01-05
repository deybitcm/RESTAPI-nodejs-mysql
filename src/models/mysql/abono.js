import { pool } from './db-connection.js'

export class PaymentModel {
  static async getAll () {
    const [rows] = await pool.query('SELECT * FROM abono')
    return rows
  }

  static async getById ({ id }) {
    const [row] = await pool.query('SELECT * FROM abono WHERE id_abono = ?', [id])
    if (row[0] != null) {
      return row[0]
    }
    return false
  }

  static async create ({ input }) {
    // id: id_abono: randomUUID()
    const newItem = {
      ...input
    }

    const [{ insertId }] = await pool.query('INSERT INTO abono set ?', [newItem])

    const [nuevoRegistro] = await pool.query('SELECT * FROM abono WHERE id_abono = ?', [insertId])

    return nuevoRegistro
  }

  static async update ({ id, input }) {
    const consulta = await PaymentModel.getById({ id })
    if (!consulta) {
      return false
    }

    const valoresNuevos = { ...input }

    await pool.query('UPDATE abono SET ? WHERE id_abono = ?', [valoresNuevos, id])

    const [nuevoRegistro] = await pool.query('SELECT * FROM abono WHERE id_abono = ?', [id])

    return nuevoRegistro[0]
  }

  static async delete ({ id }) {
    const consulta = await PaymentModel.getById({ id })
    if (!consulta) {
      return false
    }
    await pool.query('DELETE FROM abono WHERE id_abono = ?', [id])
    return true
  }
}
