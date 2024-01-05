import { pool } from './db-connection.js'

export class StorePersonModel {
  static async getAll () {
    const [rows] = await pool.query('SELECT * FROM tienda')
    return rows
  }

  static async getById ({ storeId, personId }) {
    const [row] = await pool.query('SELECT * FROM tienda WHERE id_tienda = ? AND id_persona = ?', [storeId, personId])
    if (row[0] != null) {
      return row[0]
    }
    return false
  }

  static async create ({ input }) {
    // id: id_tienda: randomUUID()
    const newItem = {
      ...input
    }

    const [{ insertId }] = await pool.query('INSERT INTO tienda set ?', [newItem])

    // const [nuevoRegistro] = await pool.query('SELECT * FROM tienda WHERE id_persona = ?', [insertId])

    console.log(insertId)

    // return nuevoRegistro
    return insertId
  }

  static async update ({ storeId, personId, input }) {
    const consulta = await StorePersonModel.getById({ storeId, personId })
    if (!consulta) {
      return false
    }

    const valoresNuevos = { ...input }

    await pool.query('UPDATE tienda SET ? WHERE id_tienda = ? AND id_persona', [valoresNuevos, storeId, personId])

    const [nuevoRegistro] = await pool.query('SELECT * FROM tienda WHERE id_tienda = ? AND id_persona', [storeId, personId])

    return nuevoRegistro[0]
  }

  static async delete ({ storeId, personId }) {
    const consulta = await StorePersonModel.getById({ storeId, personId })
    if (!consulta) {
      return false
    }
    await pool.query('DELETE FROM tienda WHERE id_tienda = ? AND id_persona', [storeId, personId])
    return true
  }
}
