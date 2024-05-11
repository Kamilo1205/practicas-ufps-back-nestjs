import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: configService.get<string>('GOOGLE_USER'),
            clientId: configService.get<string>('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
            refreshToken: configService.get<string>('GOOGLE_REFRESH_TOKEN'),
          },
        },
        defaults: {
          from: `"No Reply" <${configService.get<string>('GOOGLE_USER')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService], // Inyecta ConfigService para usar en useFactory
    }),
  ],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService]
})
export class MailModule {}
