import { z } from 'zod'

const esquemaEmpleado = z.object({
  emp_nombre: z.string({
    invalid_type_error: 'el nombre debe ser una cadena',
    required_error: 'el nombre es requerido'
  }),
  emp_apellido: z.string({
    invalid_type_error: 'el apellido debe ser una cadena',
    required_error: 'el apellido es requerido'
  }),
  emp_celular: z.string({
    invalid_type_error: 'celular debe ser una cadena',
    required_error: 'celular es requerido'
  }),
  emp_salario: z.number({
    invalid_type_error: 'el salario debe ser un numero',
    required_error: 'el salario es requerido'
  }).nonnegative()
})

export function validaciónEmpleado (input) {
  return esquemaEmpleado.safeParse(input)
}

export function validaciónParcialEmpleado (input) {
  return esquemaEmpleado.partial().safeParse(input)
}
