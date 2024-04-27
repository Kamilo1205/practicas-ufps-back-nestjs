import { ConflictException } from '@nestjs/common';

export class RolExistsException extends ConflictException {
  constructor(nombre: string) {
    super(`El rol con el nombre "${nombre}" ya esta registrado`);
  }
}
