import { ConflictException } from '@nestjs/common';

interface ErrorMessages {
  [key: string]: string;
}

export class EmpresaExistsException extends ConflictException {
  constructor(message?: string | object | any, errors?: ErrorMessages) {
    const defaultMessage = 'Nit registrador.';
    super({
      message: message || defaultMessage,
      errors: errors || {
        nit: 'El nit ya se encuentra registrado.',
      },
    });
  }
}
