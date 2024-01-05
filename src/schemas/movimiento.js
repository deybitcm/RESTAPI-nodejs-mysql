import { z } from 'zod'

const esquemaMovimiento = z.object({
  id_tienda: z.number({
    invalid_type_error: 'este campo debe ser numero',
    required_error: 'este campo es requerido'
  }),
  id_cliente_proveedor: z.number({
    invalid_type_error: 'este campo debe ser numero'
  }).default(1),
  id_colaborador: z.number({
    invalid_type_error: 'este campo debe ser numero'
  }).default(1),
  id_cat_movimiento: z.number({
    invalid_type_error: 'este campo debe ser numero'
  }).default(1),
  monto_total: z.number({
    invalid_type_error: 'este campo debe ser numero',
    required_error: 'este campo es requerido'
  }),
  total_productos: z.number({
    invalid_type_error: 'este campo debe ser numero',
    required_error: 'este campo es requerido'
  }),
  estado_pago: z.boolean({
    invalid_type_error: 'este campo debe ser boolean'
  }).default(true),
  monto_deuda: z.number({
    invalid_type_error: 'este campo debe ser numero'
  }).default(0)
})

export function validaciónMovimiento (input) {
  return esquemaMovimiento.safeParse(input)
}

export function validaciónParcialMovimiento (input) {
  return esquemaMovimiento.partial().safeParse(input)
}
