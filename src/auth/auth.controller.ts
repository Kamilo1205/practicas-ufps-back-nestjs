import { Response } from 'express';
import { Controller, Get, UseGuards, Req, Res, Post, HttpCode, UseInterceptors, Body } from '@nestjs/common';
import { GoogleOauthGuard, JwtAuthGuard, JwtRefreshGuard, LocalAuthGuard } from './guards';
import { CreateUsuarioEmpresaDto, FrogotPasswordDto } from './dto';
import { JwtCookieInterceptor } from './interceptors';
import { RequestWithUser } from './interfaces';
import { AuthService } from './auth.service';
import { Public } from './decorators';
import { Rol } from './enums';
import { ResetPasswordTokenDto } from './dto/reset-password.dto';

/**
 * Controlador para manejar la autenticación de usuarios.
 */
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  @Public()
  register(@Body() createUsuarioEmpresaDto: CreateUsuarioEmpresaDto) {
    return this.authService.crearUsuarioEmpresa(createUsuarioEmpresaDto);
  }

  @Post('forgot-password')
  @Public()
  async forgotPassword(@Body() frogotPasswordDto: FrogotPasswordDto) {
    await this.authService.sendPasswordResetEmail(frogotPasswordDto.email);
  }

  @Post('reset-password')
  @Public()
  async resetPassword(@Body() resetPasswordTokenDto: ResetPasswordTokenDto) {
    await this.authService.resetPassword(resetPasswordTokenDto);
  }

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
      const usuario = await this.authService.getUsuario(req.user.email);
      if (!usuario) {
        const redirectUrl = this.authService.getSafeRedirectUrl(usuario.rol.nombre as Rol);
        const error = 'Usuario no registrado';
        return { redirectUrl, error };
      }

      const accessToken = this.authService.getJwtAccessToken(usuario.id);
      const refreshToken = this.authService.getJwtRefreshToken(usuario.id);
      await this.authService.setCurrentRefreshToken(usuario.id, refreshToken);
      const redirectUrl = this.authService.getSafeRedirectUrl(usuario.rol.nombre as Rol);
      
      return { accessToken, refreshToken, redirectUrl };
    } catch (err) {
      const redirectUrl = this.authService.getSafeRedirectUrl();
      const error = 'Error de autenticación';
      return { redirectUrl, error };
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
  async login(@Req() req: RequestWithUser, @Res({ passthrough: true }) res: Response) {
    const accessToken = this.authService.getJwtAccessToken(req.user.id);
    const refreshToken = this.authService.getJwtRefreshToken(req.user.id);
    await this.authService.setCurrentRefreshToken(req.user.id, refreshToken);
    return { usuario: req.user, accessToken, refreshToken };
  }

  /**
   * Devuelve el perfil del usuario autenticado basado en el token de la sesión.
   * @param req - El objeto de solicitud que contiene los datos del usuario.
   * @returns Los datos del perfil del usuario autenticado.
   */
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Get('refresh')
  @Public()
  @UseGuards(JwtRefreshGuard)
  @UseInterceptors(JwtCookieInterceptor)
  refresh(@Req() req: RequestWithUser, @Res({ passthrough: true }) res: Response) {
    const accessToken = this.authService.getJwtAccessToken(req.user.id);
    return { usuario: req.user, accessToken };
  }

  @HttpCode(200)
  @Post('logout')
  async logout(@Req() req: RequestWithUser, @Res() res: Response) {
    res.cookie('access_token', '', { path: '/', maxAge: 0 });
    res.cookie('refresh_token', '', { path: '/', maxAge: 0 });
    await this.authService.removeCurrentRefreshToken(req.user.id);
    return { message: 'Cerrar sesion exitosamente' };
  }
}
