import { UnauthorizedException } from '@nestjs/common';

export class IncorrectPasswordException extends UnauthorizedException {
  constructor(message?: string | object | any, error?: string) {
    super(message || 'La contraseña proporcionada es incorrecta.', error);
  }
}
