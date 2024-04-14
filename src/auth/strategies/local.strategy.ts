import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Llamar al constructor de PassportStrategy con la estrategia 'local'
    super({
      usernameField: 'email',
    });
  }

  /**
   * Valida un usuario localmente utilizando el servicio de autenticación.
   * @param email - El correo electrónico del usuario.
   * @param password - La contraseña del usuario.
   * @returns El usuario si es válido o un error si no se encuentra o las credenciales son incorrectas.
   */
  async validate(email: string, password: string): Promise<any> {
    const usuario = await this.authService.validateUser(email, password);
    if (!usuario) {
      throw new UnauthorizedException();
    }
    return usuario;
  }
}
