import { z } from 'zod'

const esquemaAbono = z.object({
  id_movimiento: z.number({
    invalid_type_error: 'este campo debe ser numero',
    required_error: 'este campo es requerido'
  }),
  id_met_pago: z.number({
    invalid_type_error: 'este campo debe ser numero'
  }).default(1),
  monto: z.number({
    invalid_type_error: 'este campo debe ser numero',
    required_error: 'este campo es requerido'
  })
})

export function validaciónAbono (input) {
  return esquemaAbono.safeParse(input)
}

export function validaciónParcialAbono (input) {
  return esquemaAbono.partial().safeParse(input)
}
