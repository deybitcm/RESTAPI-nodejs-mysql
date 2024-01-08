import * as dotenv from 'dotenv'

dotenv.config()

export const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_SERVICE_SID
} = process.env
