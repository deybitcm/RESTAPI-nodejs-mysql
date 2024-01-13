import cors from 'cors'

const ACCEPTED_ORIGNIS = [
  'http://localhost:8080',
  'http://localhost:3000',
  'http://localhost:19006',
  'http://192.168.1.46:8081',
  'https://deybitcm.github.io'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGNIS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})
