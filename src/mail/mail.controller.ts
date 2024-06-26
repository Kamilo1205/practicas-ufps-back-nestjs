import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { Roles } from '../auth/decorators';
import { Rol } from '../auth/enums';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  @Roles(Rol.Coordinador, Rol.Administrador)
  async sendMail(@Body() sendEmailDto: SendEmailDto) {
    return await this.mailService.sendEmail(sendEmailDto.to, sendEmailDto.subject, sendEmailDto.text);
  }

  @Post('/reset-password')
  @Roles(Rol.Coordinador, Rol.Administrador)
  async sendMailResetPassword(@Body('to') to: string, @Body('token') token: string) {
    return await this.mailService.sedForgotPasswordEmail(to, token);
  }
}
