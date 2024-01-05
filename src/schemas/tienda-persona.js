import { z } from 'zod'

const esquemaTiendaPersona = z.object({
  id_tienda: z.number({
    invalid_type_error: 'este campo debe ser numero',
    required_error: 'este campo es requerido'
  }),
  id_persona: z.number({
    invalid_type_error: 'este campo debe ser numero',
    required_error: 'este campo es requerido'
  }),
  tipo_colaborador: z.number({
    invalid_type_error: 'este campo debe ser numero'
  }).default(0),
  es_cliente: z.boolean({
    invalid_type_error: 'este campo debe ser boolean'
  }).default(false),
  es_proveedor: z.boolean({
    invalid_type_error: 'este campo debe ser boolean'
  }).default(false)
})

export function validaciónTiendaPersona (input) {
  return esquemaTiendaPersona.safeParse(input)
}

export function validaciónParcialTiendaPersona (input) {
  return esquemaTiendaPersona.partial().safeParse(input)
}
