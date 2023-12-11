import { createApp } from './app.js'
import { ProductModel } from './models/mysql/producto.js'
import { EmployeeModel } from './models/mysql/empleado.js'
import { UserModel } from './models/mongodb/user.js'

createApp({ productModel: ProductModel, employeeModel: EmployeeModel, userModel: UserModel })
