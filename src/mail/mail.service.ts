import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { Empresa } from 'src/empresas/entities/empresa.entity';

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

  async sendEmailWithAttachments(to: string, subject: string, template: string, context: any, files: Express.Multer.File[]) {
    try {
      const attachments = files?.map(file => ({
        filename: file.originalname,
        content: file.buffer,
        contentType: file.mimetype,
      })) || [];

      const mailOptions: any = {
        to, // Destinatario
        from: this.configService.get<string>('GOOGLE_USER'), // Remitente
        subject,
        template, 
        context, 
        attachments
      };
  
      const response = await this.mailerService.sendMail(mailOptions);
      return response;
    } catch (error) {
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

  async sendSolicitudConvenioEmail(empresa: Empresa, files?: Express.Multer.File[]) {
    try {
      const context = {
        senderName: 'Administrador Practicas Ingieneria de Sistemas',
        senderPosition: 'Tu Puesto',
        senderEmail: 'tu_email@example.com',
        senderPhone: 'tu_numero_de_telefono',
        companyName: empresa.nombreLegal,
        representativeName: empresa.representanteLegal.nombre,
        companyAddress: `${empresa.direccion}, ${empresa.ciudad.departamento.pais.nombre}, ${empresa.ciudad.departamento.nombre}, ${empresa.ciudad.nombre} `,
        companyPhone: empresa.telefono,
        companyEmail: empresa.usuario.email,
        companySector: empresa.industria.nombre
      }
  
      const response = await this.sendEmailWithAttachments('angieestefaniajave@ufps.edu.co', 'Solicitud de convenio', './solicitud-convenio', context, files);
      return response;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al enviar el correo con los archivos adjuntos');
    }
  }
}
