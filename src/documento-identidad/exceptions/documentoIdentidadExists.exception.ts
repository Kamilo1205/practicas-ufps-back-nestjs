import { ConflictException } from '@nestjs/common';

export class DocumentoIdentidadExistsException extends ConflictException {
  constructor(numero: string) {
    super(`El número de documento de identidad "${numero}" ya esta registrado`);
  }
}
