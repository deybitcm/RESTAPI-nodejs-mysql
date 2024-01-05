import { createApp } from './app.js'
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

createApp({
  productModel: ProductModel,
  categoryModel: CategoryModel,
  clientModel: ClientModel,
  supplierModel: SupplierModel,
  collaboratorModel: CollaboratorModel,
  userModel: UserModel,
  storeModel: StoreModel,
  storePersonModel: StorePersonModel,
  paymentModel: PaymentModel,
  movementDetailModel: MovementDetailModel,
  saleModel: SaleModel,
  purchaseModel: PurchaseModel
})
