import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usuariosSerivce: UsuariosService,
  ) {
    // Llamar al constructor de PassportStrategy con la estrategia 'jwt'
    // Configurar la estrategia con opciones, como la extracción del token desde el encabezado Bearer
    // y el secreto para verificar la firma del token JWT.
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJwtFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  private static extractJwtFromCookie(req: any) {
    if (req && req.cookies) {
      return req.cookies['auth_token']; // Ajusta el nombre de la cookie según sea necesario
    }
    return null;
  }

  /**
   * Valida un token JWT y devuelve el usuario correspondiente.
   * @param payload - Los datos del token JWT.
   * @returns El usuario si se encuentra o lanza una excepción de UnauthorizedException.
   */
  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException('Token invalido o token expirado');
    }
    return this.usuariosSerivce.findOne(payload.sub);
  }
}
