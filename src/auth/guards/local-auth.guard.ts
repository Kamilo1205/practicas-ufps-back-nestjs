import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // Este guardia permite la autenticación local utilizando Passport.
  // Está configurado para autenticar a través de la estrategia 'local'.
}
