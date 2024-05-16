import { ConflictException } from '@nestjs/common';

interface ErrorMessages {
  [key: string]: string;
}

export class UsuairoExistsException extends ConflictException {
  constructor(message?: string | object | any, errors?: ErrorMessages) {
    const defaultMessage = 'Email ya se encuentra registrado.';
    super({
      message: message || defaultMessage,
      errors: errors || {
        email: 'El correo electrónico ya esta registrado.',
      },
    });
  }
}
