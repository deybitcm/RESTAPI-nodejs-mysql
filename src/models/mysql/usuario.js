import { pool } from './db-connection.js'
import bcrypt from 'bcrypt'
import { createAccessToken } from '../../../libs/jwt.js'

import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } from '../../../libs/twilio.js'
import twilio from 'twilio'

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

export class UserModel {
  static async verifyInit ({ input }) {
    try {
      const { celular } = input
      const { status } = await twilioClient.verify.v2.services(TWILIO_SERVICE_SID).verifications.create({
        to: celular,
        channel: 'whatsapp'
      })

      return { status }
    } catch (error) {
      return error
    }
  }

  static async verifyCode ({ input }) {
    try {
      const { celular, codigo } = input
      const { status } = await twilioClient.verify.v2.services(TWILIO_SERVICE_SID).verificationChecks.create({
        to: celular,
        code: codigo
      })

      if (status === 'approved') { return true }

      return false
    } catch (error) {
      console.log(error)
    }
  }

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
      // Comprobar si la persona existe
      const personFound = await pool.query('SELECT * FROM persona WHERE id_persona = ?', [newUser.id_persona])

      if (personFound[0].length === 0) {
        console.log('Persona no existe')
        return false
      }

      const userFound = await pool.query('SELECT * FROM usuario WHERE id_persona = ?', [newUser.id_persona])

      // Comprobar si el usuario existe
      if (userFound[0].length > 0) {
        console.log('Usuario existente')
        return false
      }

      // Crear usuario
      const [{ insertId }] = await pool.query('INSERT INTO usuario set ?', [newUser])
      const token = await createAccessToken({ id: insertId })

      console.log({ token })
      return { token }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  static async login ({ input }) {
    const { celular, contrasenia } = input

    try {
      const [row] = await pool.query('SELECT * FROM usuario INNER JOIN persona ON usuario.id_persona = persona.id_persona WHERE celular = ?', [celular])
      if (row[0] == null) {
        return false
      }

      const isMatch = await bcrypt.compare(contrasenia, row[0].contrasenia)
      if (!isMatch) {
        return false
      }

      const token = await createAccessToken({ id: row[0].id_usuario })
      await pool.query('UPDATE usuario SET token = ? WHERE id_persona = ?', [token, row[0].id_persona])

      return { token }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  static async logout ({ input }) {
    const { celular } = input
    const [consulta] = await pool.query('SELECT * FROM usuario INNER JOIN persona ON usuario.id_persona = persona.id_persona WHERE celular = ?', [celular])
    if (consulta[0] === undefined) {
      return false
    }
    const [isUpdated] = await pool.query('UPDATE usuario SET token = NULL WHERE id_persona = ?', [consulta[0].id_persona])
    if (isUpdated.affectedRows === 0) {
      return false
    }

    return true
  }

  static async profile ({ input }) {
    const { celular } = input
    const [consulta] = await pool.query('SELECT * FROM usuario INNER JOIN persona ON usuario.id_persona = persona.id_persona WHERE celular = ?', [celular])
    if (!consulta) {
      return false
    }
    return consulta
  }
}
