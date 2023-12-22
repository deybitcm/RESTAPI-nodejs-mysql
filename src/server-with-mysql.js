import { createApp } from './app.js'
import { ProductModel } from './models/mysql/producto.js'
import { EmployeeModel } from './models/mysql/empleado.js'
import { UserModel } from './models/mysql/usuario.js'
import { PersonModel } from './models/mysql/persona.js'

createApp({
  productModel: ProductModel,
  employeeModel: EmployeeModel,
  userModel: UserModel,
  personModel: PersonModel
})
