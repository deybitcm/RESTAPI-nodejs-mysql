import { z } from 'zod'

const esquemaDetalleMovimiento = z.object({
  id_movimiento: z.number({
    invalid_type_error: 'este campo debe ser numero',
    required_error: 'este campo es requerido'
  }),
  id_producto: z.number({
    invalid_type_error: 'este campo debe ser numero',
    required_error: 'este campo es requerido'
  }),
  cantidad: z.number({
    invalid_type_error: 'este campo debe ser numero'
  }).default(1),
  total: z.number({
    invalid_type_error: 'este campo debe ser numero',
    required_error: 'este campo es requerido'
  })
})

export function validaciónDetalleMovimiento (input) {
  return esquemaDetalleMovimiento.safeParse(input)
}

export function validaciónParcialDetalleMovimiento (input) {
  return esquemaDetalleMovimiento.partial().safeParse(input)
}
