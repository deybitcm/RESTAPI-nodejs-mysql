import { pool } from './db-connection.js'

export class CategoryModel {
  static async getAll () {
    const [rows] = await pool.query('SELECT * FROM categoria_producto')
    return rows
  }

  static async getById ({ id }) {
    const [row] = await pool.query('SELECT * FROM categoria_producto WHERE id_cat_producto = ?', [id])
    if (row[0] != null) {
      return row[0]
    }
    return false
  }

  static async create ({ input }) {
    // id: id_cat_producto: randomUUID()
    const newItem = {
      ...input
    }

    const [{ insertId }] = await pool.query('INSERT INTO categoria_producto set ?', [newItem])

    const [nuevoRegistro] = await pool.query('SELECT * FROM categoria_producto WHERE id_cat_producto = ?', [insertId])

    return nuevoRegistro
  }

  static async update ({ id, input }) {
    const consulta = await CategoryModel.getById({ id })
    if (!consulta) {
      return false
    }

    const valoresNuevos = { ...input }

    await pool.query('UPDATE categoria_producto SET ? WHERE id_cat_producto = ?', [valoresNuevos, id])

    const [nuevoRegistro] = await pool.query('SELECT * FROM categoria_producto WHERE id_cat_producto = ?', [id])

    return nuevoRegistro[0]
  }

  static async delete ({ id }) {
    const consulta = await CategoryModel.getById({ id })
    if (!consulta) {
      return false
    }
    await pool.query('DELETE FROM categoria_producto WHERE id_cat_producto = ?', [id])
    return true
  }
}
