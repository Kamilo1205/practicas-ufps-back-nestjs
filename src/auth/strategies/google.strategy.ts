import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

/**
 * Estrategia de autenticación de Google basada en passport-google-oauth20.
 * Permite la autenticación de usuarios mediante Google OAuth 2.0.
 */
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  /**
   * Configura la estrategia de Google OAuth con parámetros necesarios para la autenticación.
   * @param configService - Servicio para acceder a variables de configuración.
   */
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'), // ID de cliente de Google OAuth.
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'), // Secreto de cliente de Google OAuth.
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'), // URL de redireccionamiento configurada en la consola de Google.
      scope: ['email', 'profile'], // Solicita acceso al perfil básico y al correo electrónico del usuario.
    });
  }

  /**
   * Valida el usuario después de que Google OAuth responde.
   * Se ejecuta automáticamente después de que el usuario se autentica con Google.
   * @param accessToken - El token de acceso proporcionado por Google.
   * @param refreshToken - El token de actualización proporcionado por Google.
   * @param profile - El perfil del usuario retornado por Google.
   * @returns Un objeto con los detalles del usuario extraídos del perfil de Google.
   */
  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { name, emails, photos } = profile; // Extrae nombre, correo y foto del perfil.

    return {
      email: emails[0].value, // Correo electrónico del usuario.
      firstName: name.givenName, // Primer nombre del usuario.
      lastName: name.familyName, // Apellido del usuario.
      picture: photos[0].value, // URL de la imagen de perfil del usuario.
      accessToken, // Incluye el token de acceso en la respuesta.
      refreshToken, // Incluye el token de actualización en la respuesta.
    };
  }
}
