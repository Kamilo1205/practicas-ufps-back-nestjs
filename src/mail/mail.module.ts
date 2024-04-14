import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

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
          dir: process.cwd() + '/templates/',
          // adapter: new PugAdapter(),
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
})
export class MailModule {}
