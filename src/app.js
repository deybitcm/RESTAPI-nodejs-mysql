import express from 'express'
import morgan from 'morgan'
import { corsMiddleware } from './middlewares/cors.js'
import cookieParser from 'cookie-parser'

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

// ** importando modelos
import { ProductModel } from './models/mysql/producto.js'
import { CategoryModel } from './models/mysql/categoria-producto.js'
import { ClientModel } from './models/mysql/cliente.js'
import { SupplierModel } from './models/mysql/proveedor.js'
import { CollaboratorModel } from './models/mysql/colaborador.js'
import { UserModel } from './models/mysql/usuario.js'
import { StoreModel } from './models/mysql/tienda.js'
import { StorePersonModel } from './models/mysql/tienda-persona.js'
import { PaymentModel } from './models/mysql/abono.js'
import { MovementDetailModel } from './models/mysql/detalle-movimiento.js'
import { SaleModel } from './models/mysql/venta.js'
import { PurchaseModel } from './models/mysql/compra.js'

const app = express()

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(corsMiddleware())
// app.use(cors({ origin: true, credentials: true }))
app.disable('x-powered-by')
app.use(cookieParser())

// rutas
app.use('/api/movimientos', createMovementRouter({ SaleModel, PurchaseModel, MovementDetailModel, PaymentModel }))
app.use('/api/productos', createProductRouter({ ProductModel, CategoryModel }))
app.use('/api/personas', createPersonRouter({ ClientModel, SupplierModel, CollaboratorModel }))
app.use('/api/usuarios', createUserRouter({ UserModel }))
app.use('/api/tiendas', createStoreRouter({ StoreModel, StorePersonModel }))

app.use('*', (req, res) => {
  res.status(404).json({ mensaje: 'endpoint not found' })
})

export default app
