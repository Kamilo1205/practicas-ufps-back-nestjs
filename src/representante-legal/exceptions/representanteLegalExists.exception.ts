import { ConflictException } from '@nestjs/common';

export class RepresentanteLegalExistsException extends ConflictException {
  constructor(numeroDocumento: string) {
    super(`El representante legal con el número de documento ${numeroDocumento} ya esta registrado`);
  }
}
