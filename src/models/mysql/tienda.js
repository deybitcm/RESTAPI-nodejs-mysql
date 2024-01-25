import { pool } from './db-connection.js'
import { Response } from '../../../libs/response.js'

export class StoreModel {
  static async checkStoreState ({ id }) {
    try {
      const [consulta] = await pool.query('SELECT fn_confirmar_tienda_activo(?) AS "activo"', [id])
      if (consulta[0].activo === 1) return 2
      if (consulta[0].activo === 0) return 1
      return 0
    } catch (error) {
      return -1
    }
  }

  static async checkPersonState ({ id }) {
    try {
      const [consulta] = await pool.query('SELECT fn_confirmar_persona_activo(?) AS "activo"', [id])
      if (consulta[0].activo === 1) return 2
      if (consulta[0].activo === 0) return 1
      return 0
    } catch (error) {
      return -1
    }
  }

  // Selecciona todas las tiendas que estan asociadas a una persona
  static async getAllByPersonID ({ id }) {
    const reference = 'obtener tiendas por id_persona'
    try {
      const [rows] = await pool.query('CALL sp_seleccionar_tiendas_por_id_persona(?)', [id])
      return Response.Ok({ data: rows[0], ref: reference })
    } catch (error) {
      return Response.Error({ error, ref: reference })
    }
  }

  // Selecciona una tienda por su id
  static async getOneByStoreId ({ id }) {
    const ref = 'obtener tienda por id'
    try {
      // Procedimiento almacenado
      const [row] = await pool.query('CALL sp_seleccionar_tienda_por_id(?)', [id])
      if (row[0].length === 0) return Response.NotFound({ ref })

      // Respuesta caso exitoso
      return Response.Ok({ data: row[0], ref })
    } catch (error) {
      return Response.Error({ error, ref })
    }
  }

  static async getAllTypesOfStore () {
    const ref = 'obtener tipos de tienda'
    try {
      const [rows] = await pool.query('CALL sp_seleccionar_tipos_negocio()')
      if (rows[0].length === 0) return Response.NotFound({ ref })
      return Response.Ok({ data: rows[0], ref })
    } catch (error) {
      return Response.Error({ error, ref })
    }
  }

  static async create ({ input }) {
    const reference = 'creacion de tienda'

    // id: id_tienda: randomUUID()
    try {
      const newItem = { ...input }
      const { nombre } = newItem

      const [estado] = await pool.query('SELECT fn_confirmar_tienda_activo_por_nombre(?) AS "activo"', [nombre])
      if (estado[0].activo === 1) return Response.Conflict({ ref: reference })

      if (estado[0].activo === 0) {
        const [idTienda] = await pool.query('SELECT fn_obtener_id_tienda_por_nombre(?) AS "id"', [nombre])
        const resUpdate = await StoreModel.update({ id: idTienda[0].id, input: { ...newItem, activo: 1 } })
        resUpdate.ref = reference
        return new Response(resUpdate)
      }

      const [{ insertId }] = await pool.query('INSERT INTO tienda set ?', [newItem])

      const resGetOne = await StoreModel.getOneById(insertId)
      resGetOne.ref = reference

      return new Response(resGetOne)
    } catch (error) {
      return Response.Error({ error, ref: reference })
    }
  }

  static async update ({ id, input }) {
    const reference = 'actualizacion de tienda'
    try {
      const consulta = await StoreModel.getOneById({ id })
      if (consulta.status === 404) return Response.NotFound({ ref: reference })

      const valoresNuevos = { ...input }
      const [resUpdate] = await pool.query('UPDATE tienda SET ? WHERE id_tienda = ?', [valoresNuevos, id])
      const [resGetOne] = await pool.query('CALL sp_seleccionar_tienda_por_id(?)', [id])

      if (resUpdate[0].affectedRows === 0) return Response.NotModified({ ref: reference })
      return Response.Ok({ data: resGetOne[0], ref: reference })
    } catch (error) {
      return false
    }
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
