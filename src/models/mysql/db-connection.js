import { createPool } from 'mysql2/promise'
import { MYSQL_CREDENTIALS } from '../../config.js'

export const pool = createPool({
  host: MYSQL_CREDENTIALS.host,
  port: MYSQL_CREDENTIALS.port,
  user: MYSQL_CREDENTIALS.user,
  password: MYSQL_CREDENTIALS.password,
  database: MYSQL_CREDENTIALS.database
})
