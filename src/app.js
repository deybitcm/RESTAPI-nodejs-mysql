import express from 'express'
import morgan from 'morgan'
// import { corsMiddleware } from './middlewares/cors.js'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import cors from 'cors'

// ** importando rutas
// Productos
import { createProductRouter } from './routes/productos.js'
// Movimientos
import { createMovementRouter } from './routes/movimientos.js'
// Personas
import { createPersonRouter } from './routes/personas.js'
// Usuarios
import { createUserRouter } from './routes/usuarios.js'
// Tiendas
import { createStoreRouter } from './routes/tiendas.js'

export const createApp = ({
  saleModel,
  purchaseModel,
  movementDetailModel,
  paymentModel,
  productModel,
  categoryModel,
  clientModel,
  supplierModel,
  collaboratorModel,
  userModel,
  storeModel,
  storePersonModel
}) => {
  const app = express()

  app.set('port', process.env.PORT || 3000)

  // middlewares
  app.use(morgan('dev'))
  app.use(express.json())
  // app.use(corsMiddleware())
  app.use(cors({ origin: true, credentials: true }))
  app.disable('x-powered-by')
  app.use(cookieParser())

  // rutas
  app.use('/api/movimientos', createMovementRouter({ saleModel, purchaseModel, movementDetailModel, paymentModel }))
  app.use('/api/productos', createProductRouter({ productModel, categoryModel }))
  app.use('/api/personas', createPersonRouter({ clientModel, supplierModel, collaboratorModel }))
  app.use('/api/usuarios', createUserRouter({ userModel }))
  app.use('/api/tiendas', createStoreRouter({ storeModel, storePersonModel }))

  app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
  })
}
