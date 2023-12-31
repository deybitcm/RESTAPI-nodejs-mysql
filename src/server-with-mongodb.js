import { createApp } from './app.js'
import { ProductModel } from './models/mysql/producto.js'
import { CollaboratorModel } from './models/mysql/colaborador.js'
import { UserModel } from './models/mongodb/user.js'
import { connectDB } from './models/mongodb/db-connection.js'

connectDB()
createApp({ productModel: ProductModel, collaboratorModel: CollaboratorModel, userModel: UserModel })
