import { createApp } from './app.js'
import { ProductModel } from './models/mysql/producto.js'
import { EmployeeModel } from './models/mysql/empleado.js'
import { UserModel } from './models/mongodb/user.js'
import { PersonModel } from './models/mysql/persona.js'
import { connectDB } from './models/mongodb/db-connection.js'

connectDB()
createApp({ productModel: ProductModel, employeeModel: EmployeeModel, userModel: UserModel, personModel: PersonModel })
