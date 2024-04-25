import { ConflictException } from '@nestjs/common';

export class AreaInteresExistsException extends ConflictException {
  constructor(nombre: string) {
    super(`El area de interes "${nombre}" ya esta registrada`);
  }
}
