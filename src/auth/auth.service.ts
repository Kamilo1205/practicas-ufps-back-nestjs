import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { TokenPayload } from './interfaces';
import { Rol } from './enums/rol.enum';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthService {
  private readonly redirectionUrls = {
    [Rol.Coordinador]: this.configService.get<string>(
      'COORDINADOR_REDIRECT_URL',
    ),
    [Rol.Director]: this.configService.get<string>('DIRECTOR_REDIRECT_URL'),
    [Rol.Empresa]: this.configService.get<string>('EMPRESA_REDIRECT_URL'),
    [Rol.Estudiante]: this.configService.get<string>('ESTUDIANTE_REDIRECT_URL'),
    [Rol.Tutor]: this.configService.get<string>('TUTOR_REDIRECT_URL'),
    default: this.configService.get<string>('LOGIN_REDIRECT_URL'),
  };

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const usuario = await this.usuariosService.findOneByEmail(email);

    // Caso cuando el usuario no existe
    if (!usuario) {
      throw new UnauthorizedException(
        'No se encontró ningún usuario con el email proporcionado.',
      );
    }

    // Caso cuando el usuario tiene `password` como null (posiblemente porque se registró mediante Google)
    if (usuario.password === null) {
      throw new UnauthorizedException(
        'No tienes una contraseña establecida. Por favor, utiliza la opcion Iniciar con Google para acceder a tu cuenta',
      );
    }

    // Caso cuando la contraseña no coincide
    if (!bcrypt.compareSync(password, usuario.password)) {
      throw new UnauthorizedException(
        'La contraseña proporcionada es incorrecta.',
      );
    }

    return usuario;
  }

  getJwtAccessToke(usuarioId: string) {
    const payload: TokenPayload = { sub: usuarioId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`,
    });
    return token;
  }

  getJwtRefreshToken(usuarioId: string) {
    const payload: TokenPayload = { sub: usuarioId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`,
    });
    return token;
  }

  getSafeRedirectUrl(rol?: Rol) {
    return this.redirectionUrls[rol] || this.redirectionUrls.default;
  }

  async setCurrentRefreshToken(usuarioId: string, refreshToken: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usuariosService.updateRefreshToken(
      usuarioId,
      currentHashedRefreshToken,
    );
  }

  async removeCurrentRefreshToken(usuarioId: string) {
    await this.usuariosService.removeRefreshToken(usuarioId);
  }
}
