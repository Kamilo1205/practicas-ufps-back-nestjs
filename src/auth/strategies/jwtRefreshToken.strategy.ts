import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { TokenPayload } from '../interfaces';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usuariosService: UsuariosService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtRefreshTokenStrategy.extractJwtFromCookie,
      ]),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  private static extractJwtFromCookie(req: Request) {
    if (req && req.cookies) {
      return req.cookies['refresh_token']; // Ajusta el nombre de la cookie según sea necesario
    }
    return null;
  }

  async validate(req: Request, payload: TokenPayload) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new UnauthorizedException('No se encontro refresh token');
    }
    const usuario = await this.usuariosService.getUserIfRefreshTokenMatches(
      payload.sub,
      refreshToken,
    );
    if (!usuario) {
      throw new UnauthorizedException(
        'Refresh token es invalido o ha expirado',
      );
    }
    return usuario;
  }
}
