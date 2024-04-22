import { Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { Roles } from '../auth/decorators';
import { Rol } from '../auth/enums/rol.enum';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Roles(Rol.Coordinador)
  @Post()
  async sendMail() {
    await this.mailService.sendWelcomeEmail(
      'angieestefaniajave@ufps.edu.co',
      'Angie Estefania Jaimes Vergel',
    );
  }
}
