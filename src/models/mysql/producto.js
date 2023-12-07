import { pool } from './db-conection.js'

export class ProductModel {
  static async getAll () {
    const [rows] = await pool.query('SELECT * FROM producto')
    return rows
  }

  static async getById ({ id }) {
    const [row] = await pool.query('SELECT * FROM producto WHERE prd_id = ?', [id])
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

    await pool.query('INSERT INTO producto set ?', [newProduct])

    const [nuevoProducto] = await pool.query('SELECT * FROM producto ORDER BY prd_id DESC limit 1')

    return nuevoProducto
  }

  static async update ({ id, input }) {
    const consulta = await ProductModel.getById({ id })
    if (!consulta) {
      return false
    }

    const valoresNuevos = { ...input }

    await pool.query('UPDATE producto SET ? WHERE prd_id = ?', [valoresNuevos, id])

    const [nuevoProducto] = await pool.query('SELECT * FROM producto WHERE prd_id = ?', [id])

    return nuevoProducto
  }

  static async delete ({ id }) {
    const consulta = await ProductModel.getById({ id })
    if (!consulta) {
      return false
    }
    await pool.query('DELETE FROM producto WHERE prd_id = ?', [id])
    return true
  }
}
