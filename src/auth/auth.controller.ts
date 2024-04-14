import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  Post,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { GoogleOauthGuard, LocalAuthGuard } from './guards';
import { Public } from './decorators/public.decorator';
import { Role } from '../usuarios/enums/role.enum';
import { UsuariosService } from '../usuarios/usuarios.service';

/**
 * Controlador para manejar la autenticación de usuarios.
 */
@Controller('auth')
export class AuthController {
  private readonly redirectionUrls = {
    [Role.Coordinador]: this.configService.get<string>(
      'COORDINADOR_REDIRECT_URL',
    ),
    [Role.Director]: this.configService.get<string>('DIRECTOR_REDIRECT_URL'),
    [Role.Empresa]: this.configService.get<string>('EMPRESA_REDIRECT_URL'),
    [Role.Estudiante]: this.configService.get<string>(
      'ESTUDIANTE_REDIRECT_URL',
    ),
    [Role.Tutor]: this.configService.get<string>('TUTOR_REDIRECT_URL'),
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
  @Public()
  @Get('google')
  @UseGuards(GoogleOauthGuard)
  googleLogin() {}

  /**
   * Maneja la respuesta de autenticación de Google OAuth, asigna un token y redirecciona según el rol del usuario.
   * @param req - El objeto de solicitud que contiene los datos de usuario de Google.
   * @param res - El objeto de respuesta para manejar redirecciones.
   * @returns Redirección a la URL específica del rol del usuario o a la URL por defecto.
   */
  @Public()
  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleLoginCallback(@Req() req, @Res() res) {
    try {
      const usuario = await this.usuariosService.findOneByEmail(
        req.user?.email,
      );
      if (!usuario) return res.redirect(this.redirectionUrls.default);

      const { access_token } = await this.authService.login(usuario);
      this.setAuthCookie(res, access_token);

      const redirectUrl =
        this.redirectionUrls[usuario.rol] || this.redirectionUrls.default;
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
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res() res) {
    try {
      const { access_token } = await this.authService.login(req.user);
      this.setAuthCookie(res, access_token);
      res.status(HttpStatus.OK).send(req.user);
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
  @UseGuards(LocalAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  /**
   * Configura una cookie segura en la respuesta que contiene el token JWT del usuario.
   * @param res - El objeto de respuesta donde se configura la cookie.
   * @param token - El token JWT que se almacena en la cookie.
   */
  private setAuthCookie(res, token: string) {
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: false, // Nota: Cambiar a 'true' en entornos de producción
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 1 día
    });
  }
}
