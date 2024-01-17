import { pool } from './db-connection.js'

export class PaymentModel {
  static async getAll () {
    try {
      const [rows] = await pool.query('CALL sp_obtener_abonos()')
      if (rows[0].length > 0) return { mensaje: 'Abonos encontrados', status: 200, data: rows[0] }
      return { mensaje: 'No se encontraron abonos', status: 404, data: rows[0] }
    } catch (error) {
      return { mensaje: 'Error al obtener los abonos', status: 500 }
    }
  }

  static async getByMovementId ({ id, option }) {
    try {
      const opcion = option ?? '1'
      if (opcion !== '1' && opcion !== '0') return { mensaje: 'Opción inválida', status: 400 }
      const [tienda] = await pool.query('CALL sp_obtener_movimiento(?)', [id])
      if (tienda[0].length === 0) return { mensaje: 'No existe el movimiento', status: 404 }

      const [rows] = await pool.query('CALL sp_obtener_abonos_de_movimiento(?,?)', [id, opcion])
      if (rows[0].length > 0) return { mensaje: 'Abonos encontrados', status: 200, data: rows[0] }
      return { mensaje: 'No se encontraron abonos', status: 404, data: rows[0] }
    } catch (error) {
      return { mensaje: 'Error al obtener los abonos', status: 500 }
    }
  }

  static async getByTypeOfMovement ({ option }) {
    try {
      const opcion = option ?? '1'
      if (opcion !== '1' && opcion !== '0') return { mensaje: 'Opción inválida', status: 400 }
      const [rows] = await pool.query('CALL sp_obtener_abonos_por_tipo_movimiento(?)', [opcion])
      if (rows[0].length > 0) return { mensaje: 'Abonos encontrados', status: 200, data: rows[0] }
      return { mensaje: 'No se encontraron abonos', status: 404, data: rows[0] }
    } catch (error) {
      return { mensaje: 'Error al obtener los abonos', status: 500 }
    }
  }

  static async getById ({ id }) {
    try {
      const [row] = await pool.query('CALL sp_obtener_abono_por_id(?)', [id])
      if (row[0].length > 0) return { mensaje: 'Abono encontrado', status: 200, data: row[0] }
      return { mensaje: 'No se encontró el abono', status: 404, data: row[0] }
    } catch (error) {
      return { mensaje: 'Error al obtener el abono', status: 500 }
    }
  }

  static async create ({ input }) {
    try {
      // id: id_abono: randomUUID()
      const newItem = { ...input }

      const [movimiento] = await pool.query('CALL sp_obtener_movimiento(?)', [newItem.id_movimiento])

      if (movimiento[0].length === 0) return { mensaje: 'No existe el movimiento', status: 404 }

      const [{ insertId }] = await pool.query('INSERT INTO abono set ?', [newItem])

      const { data } = await PaymentModel.getById({ id: insertId })

      return { mensaje: 'Abono creado', status: 201, data }
    } catch (error) {
      return { mensaje: 'Error al crear el abono', status: 500 }
    }
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
