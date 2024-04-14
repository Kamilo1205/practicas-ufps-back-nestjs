import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>('URL_FRONTEND'), // Reemplaza con el origen de tu aplicación Angular
    credentials: true, // Permitir el intercambio de cookies
  });
  app.use(cookieParser());
  await app.listen(configService.get<number>('PORT') || 3000);
}
bootstrap();
