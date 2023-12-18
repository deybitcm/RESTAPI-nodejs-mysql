import { pool } from './db-connection.js'

export class UserModel {
  static async getAll () {
    const [rows] = await pool.query('SELECT * FROM usuario')
    return rows
  }

  static async getById ({ id }) {
    const [row] = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [id])
    if (row[0] != null) {
      return row[0]
    }
    return false
  }

  static async create ({ input }) {
    // id: usuario: randomUUID()
    const newUser = {
      ...input
    }

    const [{ insertId }] = await pool.query('INSERT INTO usuario set ?', [newUser])

    const [nuevoUsuario] = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [insertId])

    return nuevoUsuario
  }

  static async update ({ id, input }) {
    const consulta = await UserModel.getById({ id })
    if (!consulta) {
      return false
    }

    const valoresNuevos = { ...input }

    await pool.query('UPDATE usuario SET ? WHERE id_usuario = ?', [valoresNuevos, id])

    const [usuario] = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [id])

    return usuario
  }

  static async delete ({ id }) {
    const consulta = await UserModel.getById({ id })
    if (!consulta) {
      return false
    }
    await pool.query('DELETE FROM usuario WHERE id_usuario = ?', [id])
    return true
  }
}
