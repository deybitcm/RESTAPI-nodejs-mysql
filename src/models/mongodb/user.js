import { createAccessToken } from '../../../libs/jwt.js'
import User from './user.schema.js'
import bcrypt from 'bcryptjs'

export class UserModel {
  static async register ({ input }) {
    const { email, password, username } = input

    try {
      const passwordHash = await bcrypt.hash(password, 10)

      const newUser = new User({ email, password: passwordHash, username })
      const userSaved = await newUser.save()
      const token = await createAccessToken({ id: userSaved._id })

      return { token }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  static async login ({ input }) {
    const { email, password } = input

    try {
      const userFound = await User.findOne({ email })
      if (!userFound) return false

      const isMatch = await bcrypt.compare(password, userFound.password)
      if (!isMatch) return false

      const token = await createAccessToken({ id: userFound._id })
      return { token }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  static async logout () {
    return true
  }

  static async profile ({ input }) {
    const { id } = input
    const userFound = await User.findById(id)
    if (!userFound) return false
    return { username: userFound.username, email: userFound.email }
  }
}
