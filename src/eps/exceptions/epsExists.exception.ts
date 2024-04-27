import { ConflictException } from '@nestjs/common';

export class EpsExistsException extends ConflictException {
  constructor(nit: string) {
    super(`La eps con el nit "${nit}" ya esta registrada`);
  }
}
