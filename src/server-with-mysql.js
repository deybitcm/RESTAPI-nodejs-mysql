import { createApp } from './app.js'
import { ProductModel } from './models/mysql/producto.js'
import { CollaboratorModel } from './models/mysql/colaborador.js'
import { UserModel } from './models/mysql/usuario.js'

createApp({
  productModel: ProductModel,
  collaboratorModel: CollaboratorModel,
  userModel: UserModel
})
