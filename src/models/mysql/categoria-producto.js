import { pool } from './db-connection.js'

export class CategoryModel {
  static async getAll () {
    try {
      const [rows] = await pool.query('SELECT * FROM categoria_producto')
      if (rows[0].length === 0) return { mensaje: 'No hay productos', status: 404, data: rows[0] }
      return { mensaje: 'Productos encontrados', status: 200, data: rows[0] }
    } catch (error) {
      return { mensaje: 'Error al obtener productos', status: 500 }
    }
  }

  static async getById ({ id }) {
    try {
      const [row] = await pool.query('SELECT * FROM categoria_producto WHERE id_cat_producto = ?', [id])
      if (row.length > 0) return { mensaje: 'Producto encontrado', status: 200, data: row[0] }
      return { mensaje: 'No se encontró el producto', status: 404, data: row[0] }
    } catch (error) {
      return { mensaje: 'Error al obtener el producto', status: 500 }
    }
  }

  static async create ({ input }) {
    try {
      // id: id_cat_producto: randomUUID()
      const newItem = { ...input }

      const [{ insertId }] = await pool.query('INSERT INTO categoria_producto set ?', [newItem])

      const consulta = await CategoryModel.getById({ id: insertId })

      return { mensaje: 'Producto creado', status: 201, data: consulta.data }
    } catch (error) {
      return { mensaje: 'Error al crear el producto', status: 500 }
    }
  }

  static async update ({ id, input }) {
    try {
      const consulta = await CategoryModel.getById({ id })
      if (consulta.data.length === 0) {
        return { mensaje: 'No se encontró el producto', status: 404, data: consulta.data }
      }

      const valoresNuevos = { ...input }

      await pool.query('UPDATE categoria_producto SET ? WHERE id_cat_producto = ?', [valoresNuevos, id])

      const result = await CategoryModel.getById({ id })

      return { mensaje: 'Producto actualizado', status: 200, data: result.data }
    } catch (error) {
      return { mensaje: 'Error al actualizar el producto', status: 500 }
    }
  }

  static async delete ({ id }) {
    try {
      const consulta = await CategoryModel.getById({ id })
      if (consulta.data.length === 0) return { mensaje: 'No se encontró el producto', status: 404, data: consulta.data }
      await pool.query('DELETE FROM categoria_producto WHERE id_cat_producto = ?', [id])
      return { mensaje: 'Producto eliminado', status: 200, data: consulta.data }
    } catch (error) {
      return { mensaje: 'Error al eliminar el producto', status: 500 }
    }
  }
}
