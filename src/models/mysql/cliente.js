import { pool } from './db-connection.js'
import { Response } from '../../../libs/response.js'

export class ClientModel {
  static async getAll () {
    try {
      const [rows] = await pool.query('CALL sp_obtener_clientes()')
      if (rows[0].length > 0) return Response.Ok(rows[0])
      return Response.NotFound(rows[0])
    } catch (error) {
      return Response.Error(error)
    }
  }

  static async getById ({ id }) {
    try {
      const [row] = await pool.query('CALL sp_obtener_cliente(?)', [id])
      if (row[0].length > 0) return Response.Ok(row[0])
      return Response.NotFound(row[0])
    } catch (error) {
      return Response.Error(error)
    }
  }

  static async getCustomerByStoreByCellphone ({ input }) {
    try {
      const { celular, idTienda } = input
      const [row] = await pool.query('CALL sp_obtener_cliente_celular(?, ?)', [celular, idTienda])
      if (row[0].length > 0) return Response.Ok(row[0])
      return Response.NotFound(row[0])
    } catch (error) {
      return Response.Error(error)
    }
  }

  static async getAllByStore ({ id }) {
    try {
      const [consulta] = await pool.query('CALL sp_obtener_tienda(?)', [id])
      if (consulta[0].length === 0) return Response.NotFound(consulta[0])

      const [rows] = await pool.query('CALL sp_obtener_clientes_tienda(?)', [id])
      if (rows[0].length === 0) return Response.NotFound(rows[0])

      return Response.Ok(rows[0])
    } catch (error) {
      return Response.Error(error)
    }
  }

  // Asumiendo que la persona ya este registrada en la tabla tienda_persona
  static async create ({ input }) {
    // id: prd_id: randomUUID()
    try {
      const { celular, idTienda } = input

      const [consulta] = await pool.query('CALL sp_obtener_tienda(?)', [idTienda])
      if (consulta[0].length === 0) return Response.NotFound(consulta[0])

      const consultaClienteCelular = await ClientModel.getCustomerByStoreByCellphone([celular, idTienda])
      if (consultaClienteCelular.status === 200) return Response.Conflict(consultaClienteCelular.data)

      await pool.query('CALL sp_registrar_cliente_tienda(?, ?)', [celular, idTienda])
      return Response.Created()
    } catch (error) {
      return Response.Error(error)
    }
  }

  static async update ({ id, input }) {
    try {
      const consultaExistencia = await ClientModel.getById({ id })
      if (consultaExistencia.status === 404) return consultaExistencia

      const valoresNuevos = { ...input }
      await pool.query('UPDATE persona SET ? WHERE id_persona = ?', [valoresNuevos, id])

      const result = await ClientModel.getById({ id })
      return result
    } catch (error) {
      return { mensaje: 'Error al actualizar item', status: 500, error }
    }
  }

  static async delete ({ input }) {
    try {
      const { idCliente, idTienda } = input
      const [result] = await pool.query('CALL sp_eliminar_cliente_tienda(?, ?)', [idCliente, idTienda])
      console.log(result)
      if (result.affectedRows > 0) return Response.Deleted()
      return Response.NotModified()
    } catch (error) {
      return Response.Error(error)
    }
  }
}
