import { z } from 'zod'

const esquemaProducto = z.object({
  id_tienda: z.number({
    invalid_type_error: 'ete campo debe ser un numero',
    required_error: 'ete campo es requerido'
  }).nonnegative(),
  nombre: z.string({
    invalid_type_error: 'el nombre debe ser una cadena',
    required_error: 'el nombre es requerido'
  }),
  descripcion: z.string({
    invalid_type_error: 'descripcion debe ser una cadena',
    required_error: 'descripcion es requerido'
  }),
  costo: z.number({
    invalid_type_error: 'costo debe ser un numero',
    required_error: 'costo es requerido'
  }).nonnegative(),
  precio: z.number({
    invalid_type_error: 'el precio debe ser un numero',
    required_error: 'el precio es requerido'
  }).nonnegative(),
  stock: z.number({
    invalid_type_error: 'el stock debe ser un numero',
    required_error: 'el stock es requerido'
  }).nonnegative()
})

export function validaciónProducto (input) {
  return esquemaProducto.safeParse(input)
}

export function validaciónParcialProducto (input) {
  return esquemaProducto.partial().safeParse(input)
}
