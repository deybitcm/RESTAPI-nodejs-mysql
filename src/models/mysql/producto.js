import { pool } from './db-connection.js'

export class ProductModel {
  static async getAll () {
    try {
      const [rows] = await pool.query('CALL sp_obtener_productos()')
      if (rows[0].length > 0) {
        return { mensaje: 'Productos encontrados', status: 200, data: rows[0] }
      }
      return { mensaje: 'No hay productos', status: 404, data: rows[0] }
    } catch (error) {
      return { mensaje: 'Error al obtener productos', status: 500 }
    }
  }

  static async getAllByStore ({ id, option }) {
    try {
      const [result] = await pool.query('CALL sp_obtener_tienda(?)', [id])

      if (result[0].length === 0) return { mensaje: 'Tienda no encontrada', status: 404, data: result[0] }

      if (option !== '1' && option !== '0') return { mensaje: 'Opción no válida', status: 400 }

      const [rows] = await pool.query('CALL sp_obtener_productos_tienda(?, ?)', [id, option])

      if (rows[0].length > 0) return { mensaje: 'Productos encontrados', status: 200, data: rows[0] }
      return { mensaje: 'No hay productos', status: 404, data: rows[0] }
    } catch (error) {
      return { mensaje: 'Error al obtener productos', status: 500 }
    }
  }

  static async getById ({ id }) {
    try {
      const [row] = await pool.query('CALL sp_obtener_producto(?)', [id])
      if (row[0].length > 0) return { mensaje: 'Producto encontrado', status: 200, data: row[0] }
      return { mensaje: 'Producto no encontrado', status: 404, data: row[0] }
    } catch (error) {
      return { mensaje: 'Error al obtener producto', status: 500 }
    }
  }

  static async create ({ input }) {
    // id: id_producto: randomUUID()
    try {
      const newItem = {
        ...input
      }

      const [{ insertId }] = await pool.query('INSERT INTO producto set ?', [newItem])

      const { data } = await ProductModel.getById({ id: insertId })

      return { mensaje: 'Producto creado', status: 201, data }
    } catch (error) {
      return { mensaje: 'Error al crear producto', status: 500 }
    }
  }

  static async update ({ id, input }) {
    try {
      const { data, status } = await ProductModel.getById({ id })
      if (status === 404) {
        return { mensaje: 'Producto no encontrado', status: 404, data }
      }

      const valoresNuevos = { ...input }

      await pool.query('UPDATE producto SET ? WHERE id_producto = ?', [valoresNuevos, id])

      const { data: nuevoRegistro } = await ProductModel.getById({ id })

      return { mensaje: 'Producto actualizado', status: 200, data: nuevoRegistro }
    } catch (error) {
      return { mensaje: 'Error al actualizar producto', status: 500 }
    }
  }

  static async delete ({ id }) {
    try {
      const { data, status } = await ProductModel.getById({ id })
      if (status === 404) {
        return { mensaje: 'Producto no encontrado', status: 404, data }
      }
      await pool.query('CALL sp_desactivar_producto(?)', [id])
      return { mensaje: 'Producto eliminado', status: 200 }
    } catch (error) {
      return { mensaje: 'Error al eliminar producto', status: 500 }
    }
  }
}
