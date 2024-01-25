import { z } from 'zod'

const esquemaPersona = z.object({
  idTienda: z.number({
    invalid_type_error: 'este valor debe ser una cadena',
    required_error: 'este valor es requerido'
  }).nonnegative(),
  id_tipo_documento: z.number({
    invalid_type_error: 'este valor debe ser un numero'
  }).nonnegative().default(1),
  nombre: z.string({
    invalid_type_error: 'nombre debe ser una cadena',
    required_error: 'nombre es requerido'
  }),
  celular: z.string({
    invalid_type_error: 'celular debe ser una cadena',
    required_error: 'celular es requerido'
  }).regex(/^[0-9]+$/, 'celular debe contener solo numeros'),
  documento: z.string({
    invalid_type_error: 'documento debe ser una cadena'
  }).default(''),
  correo: z.string({
    invalid_type_error: 'correo debe ser una cadena'
  }).default('')
})

export function validaciónPersona (input) {
  return esquemaPersona.safeParse(input)
}

export function validaciónParcialPersona (input) {
  return esquemaPersona.partial().safeParse(input)
}
