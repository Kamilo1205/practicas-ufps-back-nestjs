import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const seeder = app.get(SeederService);
  await seeder.seed();

  app.enableCors({
    origin: configService.get<string>('URL_FRONTEND'), // Reemplaza con el origen de tu aplicación Angular
    credentials: true, // Permitir el intercambio de cookies
  });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.use(cookieParser());
  await app.listen(configService.get<number>('PORT') || 3000);
}
bootstrap();
