import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendWelcomeEmail(email: string, name: string) {
    const subject = 'Welcome to Our Service!';
    const text = `Hello ${name}, welcome to our service!`; // Texto plano

    try {
      await this.mailerService.sendMail({
        to: email, // Destinatario
        from: 'no-reply@ufps.edu.co', // Remitente
        subject: subject,
        text: text,
        // Si usas una plantilla Pug o Handlebars:
        // template: 'welcome',  // Ubicación de la plantilla en '/templates/welcome.pug'
        // context: {  // Variables de contexto para la plantilla
        //   name: name,
        // },
      });
      console.log('Welcome email sent successfully a ' + email);
    } catch (error) {
      console.log('Nodemailer error:' + error);
    }
  }
}
