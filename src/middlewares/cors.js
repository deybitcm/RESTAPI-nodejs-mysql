import cors from 'cors'

const ACCEPTED_ORIGNIS = []

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
