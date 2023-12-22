import { z } from 'zod'

const esquemaUsuario = z.object({
  id_persona: z.number({
    invalid_type_error: 'este valor debe ser un numero',
    required_error: 'este valor es requerido'
  }),
  nombre: z.string({
    invalid_type_error: 'nombre debe ser una cadena',
    required_error: 'nombre es requerido'
  }),
  contrasenia: z.string({
    invalid_type_error: 'contraseña debe ser una cadena',
    required_error: 'contraseña es requerido'
  }),
  token: z.string({
    invalid_type_error: 'token debe ser una cadena'
  }).default('')
})

export function validaciónUsuario (input) {
  return esquemaUsuario.safeParse(input)
}

export function validaciónParcialUsuario (input) {
  return esquemaUsuario.partial().safeParse(input)
}
