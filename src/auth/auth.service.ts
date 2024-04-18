import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { TokenPayload } from './interfaces';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthService {
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

  async setCurrentRefreshToken(userId: string, refreshToken: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usuariosService.update(userId, {
      currentHashedRefreshToken,
    });
  }
}
