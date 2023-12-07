import { z } from 'zod'

const esquemaEmpleado = z.object({
  id_rol_emp: z.number({
    invalid_type_error: 'el rol debe ser un numero',
    required_error: 'el rol es requerido'
  }),
  nombre: z.string({
    invalid_type_error: 'el nombre debe ser una cadena',
    required_error: 'el nombre es requerido'
  }),
  celular: z.string({
    invalid_type_error: 'celular debe ser una cadena',
    required_error: 'celular es requerido'
  })
})

export function validaciónEmpleado (input) {
  return esquemaEmpleado.safeParse(input)
}

export function validaciónParcialEmpleado (input) {
  return esquemaEmpleado.partial().safeParse(input)
}
