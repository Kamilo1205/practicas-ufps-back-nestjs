import { Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { Roles } from '../auth/decorators';
import { Role } from '../usuarios/enums/role.enum';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Roles(Role.Coordinador)
  @Post()
  async sendMail() {
    await this.mailService.sendWelcomeEmail(
      'angieestefaniajave@ufps.edu.co',
      'Angie Estefania Jaimes Vergel',
    );
  }
}
