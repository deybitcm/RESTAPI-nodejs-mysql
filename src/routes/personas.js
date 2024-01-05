import { Router } from 'express'
import { ClientController } from '../controllers/clientes.js'
import { SupplierController } from '../controllers/proveedores.js'
import { CollaboratorController } from '../controllers/colaboradores.js'

export const createPersonRouter = ({ clientModel, supplierModel, collaboratorModel }) => {
  const personRouter = Router()

  const clientController = new ClientController({ clientModel })
  const supplierController = new SupplierController({ supplierModel })
  const collaboratorController = new CollaboratorController({ collaboratorModel })

  // Clientes
  personRouter.get('/clientes', clientController.obtenerClientes)
  personRouter.post('/clientes', clientController.registrarCliente)

  personRouter.get('/clientes/:id', clientController.obtenerCliente)
  personRouter.patch('/clientes/:id', clientController.actualizarCliente)
  personRouter.delete('/clientes/:id', clientController.eliminarCliente)

  // Proveedores
  personRouter.get('/proveedores', supplierController.obtenerProveedores)
  personRouter.post('/proveedores', supplierController.registrarProveedor)

  personRouter.get('/proveedores/:id', supplierController.obtenerProveedor)
  personRouter.patch('/proveedores/:id', supplierController.actualizarProveedor)
  personRouter.delete('/proveedores/:id', supplierController.eliminarProveedor)

  // Colaboradores
  personRouter.get('/colaboradores', collaboratorController.obtenerColaboradores)
  personRouter.post('/colaboradores', collaboratorController.registrarColaborador)

  personRouter.get('/colaboradores/:id', collaboratorController.obtenerColaborador)
  personRouter.patch('/colaboradores/:id', collaboratorController.actualizarColaborador)
  personRouter.delete('/colaboradores/:id', collaboratorController.eliminarColaborador)

  return personRouter
}
