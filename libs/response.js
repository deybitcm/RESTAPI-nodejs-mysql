export class Response {
  constructor ({ mensaje = 'OK', status = 200, data = undefined, error = undefined, ref = undefined }) {
    this.mensaje = mensaje
    this.status = status
    this.data = data
    this.error = error
    this.ref = ref
  }

  static Ok = (
    { data = undefined, ref = '' }
  ) => {
    return new Response({
      mensaje: Message.Ok,
      status: Status.Ok,
      ref,
      data
    })
  }

  static NotFound = (
    { data = undefined, ref = '' }
  ) => {
    return new Response({
      mensaje: Message.NotFound,
      status: Status.NotFound,
      ref,
      data
    })
  }

  static Error = (
    { error = [], ref = '' }
  ) => {
    return new Response({
      mensaje: Message.Error,
      status: Status.Error,
      ref,
      error
    })
  }

  static Conflict = (
    { data = undefined, ref = '' }
  ) => {
    return new Response({
      mensaje: Message.Conflict,
      status: Status.Conflict,
      ref,
      data
    })
  }

  static Created = (
    { data = undefined, ref = '' }
  ) => {
    return new Response({
      mensaje: Message.Created,
      status: Status.Created,
      ref,
      data
    })
  }

  static Deleted = (
    { data = undefined, ref = '' }
  ) => {
    return new Response({
      mensaje: Message.Deleted,
      status: Status.Deleted,
      ref,
      data
    })
  }

  static Updated = (
    { data = undefined, ref = '' }
  ) => {
    return new Response({
      mensaje: Message.Updated,
      status: Status.Updated,
      ref,
      data
    })
  }

  static NotModified = (
    { data = undefined, ref = '' }
  ) => {
    return new Response({
      mensaje: Message.NotModified,
      status: Status.NotModified,
      ref,
      data
    })
  }

  static NotActive = (
    { data = undefined, ref = '' }
  ) => {
    return new Response({
      mensaje: Message.NotActive,
      status: Status.NotActive,
      ref,
      data
    })
  }
}

const Message = {
  Ok: 'OK',
  NotFound: 'No encontrado',
  Error: 'Error',
  Forbidden: 'No autorizado',
  Unauthorized: 'No autenticado',
  BadRequest: 'Solicitud incorrecta',
  Conflict: 'Conflicto',
  Created: 'Creado',
  Updated: 'Actualizado',
  Deleted: 'Eliminado',
  NoContent: 'Sin contenido',
  NotModified: 'No modificado',
  NotAcceptable: 'No aceptable',
  UnsupportedMediaType: 'Tipo de medio no soportado',
  InternalServerError: 'Error interno del servidor',
  NotImplemented: 'No implementado',
  NotActive: 'No activo'
}

const Status = {
  Ok: 200,
  NotFound: 404,
  Error: 500,
  Forbidden: 403,
  Unauthorized: 401,
  BadRequest: 400,
  Conflict: 409,
  Created: 201,
  Updated: 200,
  Deleted: 200,
  NoContent: 204,
  NotModified: 304,
  NotAcceptable: 406,
  UnsupportedMediaType: 415,
  InternalServerError: 500,
  NotImplemented: 501,
  NotActive: 400
}
