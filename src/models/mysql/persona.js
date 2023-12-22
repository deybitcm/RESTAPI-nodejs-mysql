import { pool } from './db-connection.js'

export class PersonModel {
  static async getAll () {
    const [rows] = await pool.query('SELECT * FROM persona')
    return rows
  }

  static async getById ({ id }) {
    const [row] = await pool.query('SELECT * FROM persona WHERE id_persona = ?', [id])
    if (row[0] != null) {
      return row[0]
    }
    return false
  }

  static async create ({ input }) {
    // id: prd_id: randomUUID()
    const newPerson = {
      ...input
    }

    const [{ insertId }] = await pool.query('INSERT INTO persona set ?', [newPerson])

    const [nuevaPersona] = await pool.query('SELECT * FROM persona WHERE id_persona = ?', [insertId])

    return nuevaPersona
  }

  static async update ({ id, input }) {
    const consulta = await PersonModel.getById({ id })
    if (!consulta) {
      return false
    }

    const valoresNuevos = { ...input }

    await pool.query('UPDATE persona SET ? WHERE id_persona = ?', [valoresNuevos, id])

    const [personaEditada] = await pool.query('SELECT * FROM persona WHERE id_persona = ?', [id])

    return personaEditada
  }

  static async delete ({ id }) {
    const consulta = await PersonModel.getById({ id })
    if (!consulta) {
      return false
    }
    await pool.query('DELETE FROM persona WHERE id_persona = ?', [id])
    return true
  }
}
