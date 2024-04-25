import { UnauthorizedException } from '@nestjs/common';

export class NullPasswordException extends UnauthorizedException {
  constructor(message?: string | object | any, error?: string) {
    super( message || 'No tienes una contraseña establecida. Por favor, utiliza la opción Iniciar con Google para acceder a tu cuenta.', error );
  }
}
