import { ConflictException } from '@nestjs/common';

export class TipoDocumentoExistsException extends ConflictException {
  constructor(nombre: string) {
    super(`El tipo de documento con el nombre "${nombre}" ya esta registrado`);
  }
}
