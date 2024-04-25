import { UnauthorizedException } from '@nestjs/common';

export class UserNotFoundException extends UnauthorizedException {
  constructor(message?: string | object | any, error?: string) {
    super(message || 'No se encontró ningún usuario con el email proporcionado.', error);
  }
}