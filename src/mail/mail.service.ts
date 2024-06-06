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
      throw new InternalServerErrorException('Error al enviar el correo');
    }
  }

  async sendEmailWithAttachments(to: string, subject: string, text: string, template: string, context: any, files: Express.Multer.File[]) {
    try {
      const attachments = files.map(file => ({
        filename: file.originalname,
        content: file.buffer,
        contentType: file.mimetype,
      }));

      console.log(attachments);
      console.log({
        to, // Destinatario
        from: this.configService.get<string>('GOOGLE_USER'), // Remitente
        subject,
        attachments, // Múltiples archivos adjuntos
        ...(template ? { template, context } : { text })
      });

      const mailOptions: any = {
        to, // Destinatario
        from: this.configService.get<string>('GOOGLE_USER'), // Remitente
        subject,
        attachments, // Múltiples archivos adjuntos
        text
      };

      const response = await this.mailerService.sendMail(mailOptions);
      return response;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al enviar el correo con los archivos adjuntos');
    }
  }

  async sedForgotPasswordEmail(to: string, token: string) {
    try {
      const resetUrl = `${this.configService.get('URL_RESET_PASSWORD')}?token=${token}`;
      const response = await this.mailerService.sendMail({ 
        to: to, // Destinatario
        from: this.configService.get<string>('GOOGLE_USER'), // Remitente
        subject: 'Solicitud de recuperación de contraseña',
        template: './forgot-password',
        context: {
          name: to,
          resetUrl
        }
      });
      return response;
    } catch (error) {
      throw new InternalServerErrorException('Erro al enviar el correo de recuperación de contraseña');
    }
  }
}
