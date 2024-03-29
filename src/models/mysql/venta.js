import { pool } from './db-connection.js'

export class SaleModel {
  static async getAll () {
    const [rows] = await pool.query('SELECT M.id_movimiento, M.fecha_movimiento, M.monto_total, C.nombre, C.id_cat_movimiento FROM movimiento M JOIN categoria_movimiento C ON M.id_cat_movimiento = C.id_cat_movimiento WHERE C.id_cat_movimiento = 1 OR C.id_cat_movimiento = 2 ORDER BY M.fecha_movimiento DESC')
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
    const consulta = await SaleModel.getById({ id })
    if (!consulta) {
      return false
    }

    const valoresNuevos = { ...input }

    await pool.query('UPDATE movimiento SET ? WHERE id_movimiento = ?', [valoresNuevos, id])

    const [nuevoRegistro] = await pool.query('SELECT * FROM movimiento WHERE id_movimiento = ?', [id])

    return nuevoRegistro[0]
  }

  static async delete ({ id }) {
    const consulta = await SaleModel.getById({ id })
    if (!consulta) {
      return false
    }
    await pool.query('DELETE FROM movimiento WHERE id_movimiento = ?', [id])
    return true
  }
}
