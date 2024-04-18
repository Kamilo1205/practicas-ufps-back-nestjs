import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { TokenPayload } from '../interfaces';

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
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  private static extractJwtFromCookie(req: Request) {
    if (req && req.cookies) {
      return req.cookies['access_token']; // Ajusta el nombre de la cookie según sea necesario
    }
    return null;
  }

  /**
   * Valida un token JWT y devuelve el usuario correspondiente.
   * @param payload - Los datos del token JWT.
   * @returns El usuario si se encuentra o lanza una excepción de UnauthorizedException.
   */
  async validate(payload: TokenPayload) {
    return this.usuariosSerivce.findOne(payload.sub);
  }
}
