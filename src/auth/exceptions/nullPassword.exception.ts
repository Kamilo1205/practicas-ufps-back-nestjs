import { UnauthorizedException } from '@nestjs/common';

interface ErrorMessages {
  [key: string]: string;
}

export class NullPasswordException extends UnauthorizedException {
  constructor(message?: string | object | any, errors?: ErrorMessages) {
    const defaultMessage = 'No se puede iniciar sesión con contraseña porque el usuario se registró utilizando un proveedor de autenticación externo.';
    super({
      message: message || defaultMessage,
      errors: errors || {
        password: 'No se puede iniciar sesión con contraseña.',
      },
    });
  }
}
