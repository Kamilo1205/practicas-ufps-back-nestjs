import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  Post,
  HttpStatus,
  HttpCode,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { GoogleOauthGuard, JwtRefreshGuard, LocalAuthGuard } from './guards';
import { Public } from './decorators';
import { RequestWithUser } from './interfaces';
import { AuthService } from './auth.service';
import { Rol } from './enums/rol.enum';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtCookieInterceptor } from './interceptors/jwt-cookie.interceptor';

/**
 * Controlador para manejar la autenticación de usuarios.
 */
@Controller('auth')
export class AuthController {
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
    private readonly authService: AuthService,
    private readonly usuariosService: UsuariosService,
    private configService: ConfigService,
  ) {}

  /**
   * Inicia el flujo de autenticación con Google OAuth.
   */
  @Get('google')
  @Public()
  @UseGuards(GoogleOauthGuard)
  googleLogin() {}

  /**
   * Maneja la respuesta de autenticación de Google OAuth, asigna un token y redirecciona según el rol del usuario.
   * @param req - El objeto de solicitud que contiene los datos de usuario de Google.
   * @param res - El objeto de respuesta para manejar redirecciones.
   * @returns Redirección a la URL específica del rol del usuario o a la URL por defecto.
   */
  @Get('google/callback')
  @Public()
  @UseGuards(GoogleOauthGuard)
  @UseInterceptors(JwtCookieInterceptor)
  async googleLoginCallback(@Req() req: RequestWithUser, @Res() res: Response) {
    try {
      const usuario = await this.usuariosService.findOneByEmail(
        req.user?.email,
      );
      if (!usuario) return res.redirect(this.redirectionUrls.default);

      const accessToken = this.authService.getJwtAccessToke(req.user.id);
      const refreshToken = this.authService.getJwtRefreshToken(req.user.id);
      const redirectUrl = this.getSafeRedirectUrl(usuario.rol.nombre as Rol);
      return res.redirect(redirectUrl);
    } catch (error) {
      return res.redirect(this.redirectionUrls.default);
    }
  }

  /**
   * Autentica al usuario utilizando credenciales locales, asigna un token y devuelve los detalles del usuario.
   * @param req - El objeto de solicitud que incluye las credenciales del usuario.
   * @param res - El objeto de respuesta para enviar el usuario autenticado.
   * @returns El usuario autenticado si la autenticación es exitosa, de lo contrario lanza una excepción.
   */
  @HttpCode(200)
  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(JwtCookieInterceptor)
  async login(
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = this.authService.getJwtAccessToke(req.user.id);
    const refreshToken = this.authService.getJwtRefreshToken(req.user.id);
    return {
      ususario: req.user,
      accessToken,
      refreshToken,
    };
  }

  /**
   * Devuelve el perfil del usuario autenticado basado en el token de la sesión.
   * @param req - El objeto de solicitud que contiene los datos del usuario.
   * @returns Los datos del perfil del usuario autenticado.
   */
  @Get('profile')
  @UseGuards(LocalAuthGuard)
  getProfile(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Get('refresh')
  @Public()
  @UseGuards(JwtRefreshGuard)
  refresh(
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = this.authService.getJwtAccessToke(req.user.id);
    return {
      usuario: req.user,
      accessToken,
    };
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.cookie('access_token', '', { path: '/', maxAge: 0 });
    res.cookie('refresh_token', '', { path: '/', maxAge: 0 });
    return res.status(HttpStatus.OK).json({ message: 'Logout successful' });
  }

  private getSafeRedirectUrl(rol: Rol) {
    return this.redirectionUrls[rol] || this.redirectionUrls.default;
  }
}
