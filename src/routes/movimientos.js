import { Router } from 'express'
import { SaleController } from '../controllers/ventas.js'
import { PurchaseController } from '../controllers/compras.js'
import { MovementDetailController } from '../controllers/detalle-movimiento.js'
import { PaymentController } from '../controllers/abonos.js'

export const createMovementRouter = ({ saleModel, purchaseModel, movementDetailModel, paymentModel }) => {
  const movementRouter = Router()

  const saleController = new SaleController({ saleModel })
  const purchaseController = new PurchaseController({ purchaseModel })
  const movementDetailController = new MovementDetailController({ movementDetailModel })
  const paymentController = new PaymentController({ paymentModel })

  // Ventas
  movementRouter.get('/ventas', saleController.obtenerVentas)
  movementRouter.post('/ventas', saleController.registrarVenta)

  movementRouter.get('/ventas/:id', saleController.obtenerVenta)
  movementRouter.patch('/ventas/:id', saleController.actualizarVenta)
  movementRouter.delete('/ventas/:id', saleController.eliminarVenta)

  // Compras
  movementRouter.get('/compras', purchaseController.obtenerCompras)
  movementRouter.post('/compras', purchaseController.registrarCompra)

  movementRouter.get('/compras/:id', purchaseController.obtenerCompra)
  movementRouter.patch('/compras/:id', purchaseController.actualizarCompra)
  movementRouter.delete('/compras/:id', purchaseController.eliminarCompra)

  // Detalles
  movementRouter.get('/detalles', movementDetailController.obtenerDetalles)
  movementRouter.post('/detalles', movementDetailController.registrarDetalle)

  movementRouter.get('/detalles/:id', movementDetailController.obtenerDetalle)
  movementRouter.patch('/detalles/:id', movementDetailController.actualizarDetalle)
  movementRouter.delete('/detalles/:id', movementDetailController.eliminarDetalle)

  // Abonos
  movementRouter.get('/abonos', paymentController.obtenerAbonos)
  movementRouter.post('/abonos', paymentController.registrarAbono)

  movementRouter.get('/abonos/movimiento/:id', paymentController.obtenerAbonosMovimiento)
  movementRouter.get('/abonos/:id', paymentController.obtenerAbono)
  movementRouter.patch('/abonos/:id', paymentController.actualizarAbono)
  movementRouter.delete('/abonos/:id', paymentController.eliminarAbono)

  return movementRouter
}
