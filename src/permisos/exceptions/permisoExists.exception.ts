import { ConflictException } from '@nestjs/common';

export class PermisoExistsException extends ConflictException {
  constructor(nombre: string) {
    super(`El permiso con el nombre "${nombre}" ya esta registrado`);
  }
}
