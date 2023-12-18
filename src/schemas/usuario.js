import { z } from 'zod'

const esquemaUsuario = z.object({
  id_rol_empleado: z.number({
    invalid_type_error: 'el rol debe ser un numero',
    required_error: 'el rol es requerido'
  }),
  id_tienda: z.number({
    invalid_type_error: 'este valor debe ser un numero',
    required_error: 'este valor es requerido'
  }),
  id_tipo_documento: z.number({
    invalid_type_error: 'este valor debe ser un numero',
    required_error: 'este valor es requerido'
  }).default(1),
  nombre: z.string({
    invalid_type_error: 'el nombre debe ser una cadena',
    required_error: 'el nombre es requerido'
  }),
  celular: z.string({
    invalid_type_error: 'celular debe ser una cadena',
    required_error: 'celular es requerido'
  }),
  apellido: z.string({
    invalid_type_error: 'apellido debe ser una cadena',
    required_error: 'apellido es requerido'
  }).default(''),
  documento: z.string({
    invalid_type_error: 'documento debe ser una cadena',
    required_error: 'documento es requerido'
  }).default(''),
  correo: z.string({
    invalid_type_error: 'correo debe ser una cadena',
    required_error: 'correo es requerido'
  }).default('')
})

export function validaciónUsuario (input) {
  return esquemaUsuario.safeParse(input)
}

export function validaciónParcialUsuario (input) {
  return esquemaUsuario.partial().safeParse(input)
}
