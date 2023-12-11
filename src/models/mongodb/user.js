export class UserModel {
  static async findUserByUsername (username) {
    const [rows] = await this.dbConnection.query('SELECT * FROM users WHERE username = ?', [username])
    return rows[0]
  }

  static async createUser (user) {
    const [rows] = await this.dbConnection.query('INSERT INTO users SET ?', [user])
    return rows.insertId
  }

  static async login ({ email, password }) {
    const [rows] = await this.dbConnection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password])
    return rows[0]
  }
}
