import { UnauthorizedException } from '@nestjs/common';

interface ErrorMessages {
  [key: string]: string;
}

export class UserNotFoundException extends UnauthorizedException {
  constructor(message?: string | object | any, errors?: ErrorMessages) {
    const defaultMessage = 'Usuario no encontrado. Por favor, verifique su correo electrónico.';
    super({
      message: message || defaultMessage,
      errors: errors || {
        email: 'No se encontró ningún usuario con el correo proporcionado.',
      },
    });
  }
}