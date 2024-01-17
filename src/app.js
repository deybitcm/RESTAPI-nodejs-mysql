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
// Categorias de Productos
import { createCategoryRouter } from './routes/categorias.js'

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
app.use('/api/movimientos', createMovementRouter({ saleModel: SaleModel, purchaseModel: PurchaseModel, movementDetailModel: MovementDetailModel, paymentModel: PaymentModel }))
app.use('/api/productos', createProductRouter({ productModel: ProductModel }))

app.use('/api/personas', createPersonRouter({ clientModel: ClientModel, supplierModel: SupplierModel, collaboratorModel: CollaboratorModel }))
app.use('/api/usuarios', createUserRouter({ userModel: UserModel }))
app.use('/api/tiendas', createStoreRouter({ storeModel: StoreModel, storePersonModel: StorePersonModel }))
app.use('/api/categorias', createCategoryRouter({ categoryModel: CategoryModel }))

app.use('*', (req, res) => {
  res.status(404).json({ mensaje: 'endpoint not found' })
})

export default app
