import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService, private readonly configService: ConfigService) {}

  async sendEmail(to: string[], subject: string, text: string) {
    try {
      const response = await this.mailerService.sendMail({ 
        to: to.join(','), // Destinatario
        from: this.configService.get<string>('GOOGLE_USER'), // Remitente
        subject,
        text,
      });
      return response;
    } catch (error) {
      throw new InternalServerErrorException('Erro al enviar el correo');
    }
  }

  async sedForgotPasswordEmail(to: string, token: string) {
    try {
      const response = await this.mailerService.sendMail({ 
        to: to, // Destinatario
        from: this.configService.get<string>('GOOGLE_USER'), // Remitente
        subject: 'Solicitud de recuperación de contraseña',
        template: './forgot-password',
        context: {
          name: to,
          resetUrl: token
        }
      });
      return response;
    } catch (error) {
      throw new InternalServerErrorException('Erro al enviar el correo de recuperación de contraseña');
    }
  }
}
