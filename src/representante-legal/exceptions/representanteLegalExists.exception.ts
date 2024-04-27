import { ConflictException } from '@nestjs/common';

export class RepresentanteLegalExistsException extends ConflictException {
  constructor(email: string) {
    super(`El representante legal con email "${email}" ya esta registrado`);
  }
}
