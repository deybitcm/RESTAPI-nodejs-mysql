import { createApp } from './app.js'
import { ProductModel } from './models/mysql/producto.js'
import { EmployeeModel } from './models/mysql/empleado.js'

createApp({ productModel: ProductModel, employeeModel: EmployeeModel })
