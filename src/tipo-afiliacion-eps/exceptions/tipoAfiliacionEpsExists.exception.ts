import { ConflictException } from '@nestjs/common';

export class TipoAfiliacionEpsExistsException extends ConflictException {
  constructor(nombre: string) {
    super(`El tipo de afiliacion "${ nombre }" ya esta registrada`);
  }
}
