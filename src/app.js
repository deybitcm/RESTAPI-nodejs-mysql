import express from 'express'
import morgan from 'morgan'
import { corsMiddleware } from './middlewares/cors.js'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

// importando rutas
import { createEmployeeRouter } from './routes/empleados.js'
import { createProductRouter } from './routes/productos.js'
import { createAuthRouter } from './routes/auth.js'

export const createApp = ({ productModel, employeeModel, userModel }) => {
  const app = express()

  app.set('port', process.env.PORT || 3000)

  // middlewares
  app.use(morgan('dev'))
  app.use(express.json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')
  app.use(cookieParser())

  // rutas
  app.use('/api/empleados', createEmployeeRouter({ employeeModel }))
  app.use('/api/productos', createProductRouter({ productModel }))
  app.use('/api', createAuthRouter({ userModel }))

  app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
  })
}
