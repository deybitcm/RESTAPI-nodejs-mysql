import { pool } from './db-connection.js'

export class PurchaseModel {
  static async getAll () {
    const [rows] = await pool.query('SELECT * FROM movimiento')
    return rows
  }

  static async getById ({ id }) {
    const [row] = await pool.query('SELECT * FROM movimiento WHERE id_movimiento = ?', [id])
    if (row[0] != null) {
      return row[0]
    }
    return false
  }

  static async create ({ input }) {
    // ** id: id_movimiento: randomUUID()
    const newItem = {
      ...input
    }

    const [{ insertId }] = await pool.query('INSERT INTO movimiento set ?', [newItem])

    const [nuevoRegistro] = await pool.query('SELECT * FROM movimiento WHERE id_movimiento = ?', [insertId])

    return nuevoRegistro
  }

  static async update ({ id, input }) {
    const consulta = await PurchaseModel.getById({ id })
    if (!consulta) {
      return false
    }

    const valoresNuevos = { ...input }

    await pool.query('UPDATE movimiento SET ? WHERE id_movimiento = ?', [valoresNuevos, id])

    const [nuevoRegistro] = await pool.query('SELECT * FROM movimiento WHERE id_movimiento = ?', [id])

    return nuevoRegistro[0]
  }

  static async delete ({ id }) {
    const consulta = await PurchaseModel.getById({ id })
    if (!consulta) {
      return false
    }
    await pool.query('DELETE FROM movimiento WHERE id_movimiento = ?', [id])
    return true
  }
}
