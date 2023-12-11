import express from 'express'
import morgan from 'morgan'
import { corsMiddleware } from './middlewares/cors.js'
import { createEmployeeRouter } from './routes/empleados.js'
import { createProductRouter } from './routes/productos.js'

export const createApp = ({ productModel, employeeModel }) => {
  const app = express()

  app.set('port', process.env.PORT || 3000)

  // middlewares
  app.use(morgan('dev'))
  app.use(express.json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  // rutas
  app.use('/api/empleados', createEmployeeRouter({ employeeModel }))
  app.use('/api/productos', createProductRouter({ productModel }))

  app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
  })
}
