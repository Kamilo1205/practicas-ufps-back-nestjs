import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

import { CreateUsuarioEmpresaDto } from './dto';
import { IncorrectPasswordException, NullPasswordException, UserNotFoundException } from './exceptions';
import { TokenPayload } from './interfaces';
import { Rol } from './enums/rol.enum';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { RolesService } from 'src/roles/roles.service';
import { MailService } from 'src/mail/mail.service';
import { ResetPasswordTokenDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  private readonly redirectionUrls = {
    [Rol.Coordinador]: this.configService.get<string>('COORDINADOR_REDIRECT_URL'),
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
    private readonly rolesService: RolesService,
    private readonly mailService: MailService
  ) {}

  async crearUsuario(createUsuarioEmpresaDto: CreateUsuarioEmpresaDto) {
    const rolNombre = createUsuarioEmpresaDto.email.endsWith('@ufps.edu.co') ? Rol.Dependencia : Rol.Empresa;
    const rol = await this.rolesService.findOneByNombre(rolNombre);

    return this.usuariosService.create({
      ...createUsuarioEmpresaDto, rolesIds: [rol.id], 
      imagenUrl: null, displayName: null, 
      estaActivo: true, emailConfirmado: null, 
      estaRegistrado: false
    });
  }

  async updateImagenUsuario(usuarioId: string, imagenUrl: string) {
    this.usuariosService.update(usuarioId, { imagenUrl });
  }

  async confirmarEmail(usuarioId: string) {
    this.usuariosService.update(usuarioId, { emailConfirmado: new Date() });
  }

  async validateUser(email: string, password: string) {
    const usuario = await this.usuariosService.findOneByEmail(email);

    if (!usuario) throw new UserNotFoundException();
    if (usuario.password === null) throw new NullPasswordException();
    if (!bcrypt.compareSync(password, usuario.password)) throw new IncorrectPasswordException();
    if (!usuario.estaActivo) return null;
    return usuario;
  }

  getJwtAccessToken(usuarioId: string) {
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

  getUsuario(email: string) {
    return this.usuariosService.findOneByEmail(email);
  }

  async setCurrentRefreshToken(usuarioId: string, refreshToken: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usuariosService.updateRefreshToken(usuarioId, currentHashedRefreshToken);
  }

  async removeCurrentRefreshToken(usuarioId: string) {
    await this.usuariosService.removeRefreshToken(usuarioId);
  }

  async sendPasswordResetEmail(email: string) {
    const usuario = await this.usuariosService.findOneByEmail(email);
    if (!usuario) throw new UserNotFoundException();
    const token = this.jwtService.sign({ email }, {
      secret: this.configService.get('JWT_RESET_PASSWORD_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_RESET_PASSWORD_TOKEN_EXPIRATION_TIME')}s`,
    });
    return await this.mailService.sedForgotPasswordEmail(email, token);
  }

  async resetPassword(resetPasswordTokenDto: ResetPasswordTokenDto) {
    try {
      const decodedToken = this.jwtService.verify(resetPasswordTokenDto.token, {
        secret: this.configService.get('JWT_RESET_PASSWORD_TOKEN_SECRET'),
      });
      await this.usuariosService.updatePassword(decodedToken.email, resetPasswordTokenDto.password);
    } catch (error) {
      throw new NotFoundException('Token no válido');
    }
  }
}
