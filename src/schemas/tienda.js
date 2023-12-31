import { z } from 'zod'

const esquemaTienda = z.object({
  nombre: z.string({
    invalid_type_error: 'nombre debe ser una cadena',
    required_error: 'nombre es requerido'
  }),
  direccion: z.string({
    invalid_type_error: 'direccion debe ser una cadena'
  }).default(''),
  ciudad: z.string({
    invalid_type_error: 'ciudad debe ser una cadena'
  }).default(''),
  correo: z.string({
    invalid_type_error: 'correo debe ser una cadena'
  }).default('')
})

export function validaciónTienda (input) {
  return esquemaTienda.safeParse(input)
}

export function validaciónParcialTienda (input) {
  return esquemaTienda.partial().safeParse(input)
}
