import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  Post,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { GoogleOauthGuard, JwtRefreshGuard, LocalAuthGuard } from './guards';
import { Public } from './decorators';
import { RequestWithUser } from './interfaces';
import { AuthService } from './auth.service';
import { Rol } from './enums/rol.enum';
import { UsuariosService } from '../usuarios/usuarios.service';

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
  async googleLoginCallback(@Req() req: RequestWithUser, @Res() res: Response) {
    try {
      const usuario = await this.usuariosService.findOneByEmail(
        req.user?.email,
      );
      if (!usuario) return res.redirect(this.redirectionUrls.default);

      await this.authenticateAndSetCookie(req.user, res);
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
  async login(@Req() req: RequestWithUser, @Res() res: Response) {
    try {
      await this.authenticateAndSetCookie(req.user, res);
      return res.send(req.user);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Failed to login');
    }
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
  refresh(@Req() req: RequestWithUser, @Res() res: Response) {
    this.setCookieAccessToken(req.user, res);
    return res.send(req.user);
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

  /**
   * Proceso común para autenticar al usuario, asignar token y configurar cookie.
   * @param user - El usuario autenticado cuyo token se necesita configurar.
   * @param res - Objeto de respuesta HTTP donde configurar la cookie.
   */
  private async authenticateAndSetCookie(
    user: RequestWithUser['user'],
    res: Response,
  ) {
    const refreshToken = await this.setCookieRefreshToken(user, res);
    const accessToken = this.setCookieAccessToken(user, res);
    return { accessToken, refreshToken }; // Retornar el token por si es necesario para otros usos
  }

  private setCookieAccessToken(user: RequestWithUser['user'], res: Response) {
    const accessToken = this.authService.getJwtAccessToke(user.id);
    const accessTokenTime = this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    );
    this.setCookie(res, 'access_token', accessToken, accessTokenTime);
    return accessToken; // Retornar el token por si es necesario para otros usos
  }

  private async setCookieRefreshToken(
    user: RequestWithUser['user'],
    res: Response,
  ) {
    const refreshToken = this.authService.getJwtRefreshToken(user.id);
    const refreshTokenTime = this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    );
    await this.authService.setCurrentRefreshToken(user.id, refreshToken);
    this.setCookie(res, 'refresh_token', refreshToken, refreshTokenTime);
    return refreshToken; // Retornar el token por si es necesario para otros usos
  }

  /**
   * Configura una cookie segura en la respuesta que contiene un valor específico.
   * @param res - El objeto de respuesta donde se configura la cookie.
   * @param token - El valor que se almacena en la cookie.
   * @param cookieName - Nombre de la cookie.
   * @param maxAgeInSeconds - Duración de la cookie en segundos.
   */
  private setCookie(
    res: Response,
    cookieName: string,
    token: string,
    maxAgeInSeconds: number,
  ) {
    res.cookie(cookieName, token, {
      httpOnly: true,
      secure: false, // Asegura la cookie en producción
      sameSite: 'lax', // La configuración 'SameSite=lax' es generalmente adecuada para la mayoría de los casos
      maxAge: maxAgeInSeconds * 1000, // maxAge en milisegundos
    });
  }
}
