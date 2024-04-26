import { ForbiddenException } from '@nestjs/common';

export class InsufficientPermissionsException extends ForbiddenException {
  constructor(permisos: string[]) {
    super(`Acceso Denegado: Permisos insuficientes. Se requiere los permisos [${permisos.toString()}].`);
  }
}
