import { pool } from './db-connection.js'

export class StoreModel {
  static async getAll () {
    const [rows] = await pool.query('SELECT * FROM tienda')
    return rows
  }

  static async getById ({ id }) {
    const [row] = await pool.query('SELECT * FROM tienda WHERE id_tienda = ?', [id])
    if (row[0] != null) {
      return row[0]
    }
    return false
  }

  static async getTypesOfStore () {
    try {
      const [rows] = await pool.query('SELECT id_tipo_negocio, nombre FROM tipo_negocio')
      return { mensaje: 'Tipos de negocio', status: 200, data: rows }
    } catch (error) {
      return { mensaje: 'Error al obtener los tipos de negocio', status: 500, data: error }
    }
  }

  static async create ({ input }) {
    // id: id_tienda: randomUUID()
    const newItem = {
      ...input
    }

    const [{ insertId }] = await pool.query('INSERT INTO tienda set ?', [newItem])

    const [nuevoRegistro] = await pool.query('SELECT * FROM tienda WHERE id_tienda = ?', [insertId])

    return nuevoRegistro
  }

  static async update ({ id, input }) {
    const consulta = await StoreModel.getById({ id })
    if (!consulta) {
      return false
    }

    const valoresNuevos = { ...input }

    await pool.query('UPDATE tienda SET ? WHERE id_tienda = ?', [valoresNuevos, id])

    const [nuevoRegistro] = await pool.query('SELECT * FROM tienda WHERE id_tienda = ?', [id])

    return nuevoRegistro[0]
  }

  static async delete ({ id }) {
    const consulta = await StoreModel.getById({ id })
    if (!consulta) {
      return false
    }
    await pool.query('DELETE FROM tienda WHERE id_tienda = ?', [id])
    return true
  }
}
