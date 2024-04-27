import { ConflictException } from '@nestjs/common';

export class UsuairoExistsException extends ConflictException {
  constructor(email: string) {
    super(`El usuario con el email "${email}" ya esta registrado`);
  }
}
