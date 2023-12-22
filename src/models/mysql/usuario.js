import { pool } from './db-connection.js'
import bcrypt from 'bcrypt'
import { createAccessToken } from '../../../libs/jwt.js'

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

  static async register ({ input }) {
    const newUser = {
      ...input,
      contrasenia: bcrypt.hashSync(input.contrasenia, 10)
    }

    try {
      const userFound = await pool.query('SELECT * FROM usuario WHERE id_persona = ?', [newUser.id_persona])

      if (userFound[0].length > 0) {
        console.log('Usuario existente')
        return false
      }

      const [{ insertId }] = await pool.query('INSERT INTO usuario set ?', [newUser])
      const token = await createAccessToken({ id: insertId })

      return { token }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  static async login ({ input }) {
    const { celular, contrasenia } = input

    try {
      const [row] = await pool.query('SELECT * FROM usuario WHERE correo = ?', [celular])
      console.log(row)
      if (row[0] == null) {
        return false
      }

      const isMatch = await bcrypt.compare(contrasenia, row[0].contrasenia)
      if (!isMatch) {
        return false
      }

      const token = await createAccessToken({ id: row[0].id_usuario })
      return { token }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  static async logout ({ input }) {
    const { id } = input
    const consulta = await UserModel.getById({ id })
    if (!consulta) {
      return false
    }
    await pool.query('UPDATE usuario SET token = NULL WHERE id_usuario = ?', [id])
    return true
  }

  static async profile ({ input }) {
    const { id } = input
    const consulta = await UserModel.getById({ id })
    if (!consulta) {
      return false
    }
    const [row] = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [id])
    return row[0]
  }
}
