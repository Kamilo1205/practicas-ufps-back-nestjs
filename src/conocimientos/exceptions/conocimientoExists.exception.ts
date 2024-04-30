import { ConflictException } from '@nestjs/common';

export class ConocimientoExistsException extends ConflictException {
  constructor(nombre: string) {
    super(`El conocimiento con el nombre "${nombre}" ya esta registrado`);
  }
}
