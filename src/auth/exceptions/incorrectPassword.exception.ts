import { UnauthorizedException } from '@nestjs/common';

interface ErrorMessages {
  [key: string]: string;
}

export class IncorrectPasswordException extends UnauthorizedException {
  constructor(message?: string | object | any, errors?: ErrorMessages) {
    const defaultMessage = 'Contraseña incorrecta. Por favor, verifique su contraseña.';
    super({
      message: message || defaultMessage,
      errors: errors || {
        password: 'La contraseña ingresada no coincide con la registrada.',
      },
    });
  }
}
