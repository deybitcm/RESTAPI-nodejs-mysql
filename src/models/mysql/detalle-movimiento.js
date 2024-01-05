import { pool } from './db-connection.js'

export class MovementDetailModel {
  static async getAll () {
    const [rows] = await pool.query('SELECT * FROM detalle_movimiento')
    return rows
  }

  static async getById ({ id }) {
    const [row] = await pool.query('SELECT * FROM detalle_movimiento WHERE id_det_movimiento = ?', [id])
    if (row[0] != null) {
      return row[0]
    }
    return false
  }

  static async create ({ input }) {
    // id: id_det_movimiento: randomUUID()
    const newItem = {
      ...input
    }

    const [{ insertId }] = await pool.query('INSERT INTO detalle_movimiento set ?', [newItem])

    const [nuevoRegistro] = await pool.query('SELECT * FROM detalle_movimiento WHERE id_det_movimiento = ?', [insertId])

    return nuevoRegistro
  }

  static async update ({ id, input }) {
    const consulta = await MovementDetailModel.getById({ id })
    if (!consulta) {
      return false
    }

    const valoresNuevos = { ...input }

    await pool.query('UPDATE detalle_movimiento SET ? WHERE id_det_movimiento = ?', [valoresNuevos, id])

    const [nuevoRegistro] = await pool.query('SELECT * FROM detalle_movimiento WHERE id_det_movimiento = ?', [id])

    return nuevoRegistro[0]
  }

  static async delete ({ id }) {
    const consulta = await MovementDetailModel.getById({ id })
    if (!consulta) {
      return false
    }
    await pool.query('DELETE FROM detalle_movimiento WHERE id_det_movimiento = ?', [id])
    return true
  }
}
