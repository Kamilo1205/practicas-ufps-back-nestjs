import { ConflictException } from '@nestjs/common';

export class EmpresaExistsException extends ConflictException {
  constructor(nit: string) {
    super(`La empresa con el nit "${nit}" ya esta registrada`);
  }
}
