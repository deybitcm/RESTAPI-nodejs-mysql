import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || 3000
export const MYSQL_CREDENTIALS = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}
export const TWILIO = {
  accountsId: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  serviceId: process.env.TWILIO_SERVICE_SID
}
