import { Router } from 'express'
import { EmployeeController } from '../controllers/empleados.js'

export const createEmployeeRouter = ({ employeeModel }) => {
  const employeeRouter = Router()

  const employeeController = new EmployeeController({ employeeModel })

  employeeRouter.get('/', employeeController.obtenerEmpleados)
  employeeRouter.post('/', employeeController.registrarEmpleado)

  employeeRouter.get('/:id', employeeController.obtenerEmpleado)
  employeeRouter.patch('/:id', employeeController.actualizarEmpleado)
  employeeRouter.delete('/:id', employeeController.eliminarEmpleado)

  return employeeRouter
}
