import { z } from 'zod'

const esquemaCategoria = z.object({
  id_tienda: z.number({
    invalid_type_error: 'este campo debe ser numero',
    required_error: 'este campo es requerido'
  }),
  nombre: z.string({
    invalid_type_error: 'este campo debe ser una cadena',
    required_error: 'este campo es requerido'
  })
})

export function validaciónCategoria (input) {
  return esquemaCategoria.safeParse(input)
}

export function validaciónParcialCategoria (input) {
  return esquemaCategoria.partial().safeParse(input)
}
