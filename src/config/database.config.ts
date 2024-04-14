import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isSSL = this.configService.get<boolean>('DB_SSL');
    return {
      type: this.configService.get<'mysql' | 'postgres'>('BD_TYPE'),
      host: this.configService.get<string>('BD_HOST'),
      port: +this.configService.get<number>('BD_PORT'),
      username: this.configService.get<string>('BD_USERNAME'),
      password: this.configService.get<string>('BD_PASSWORD'),
      database: this.configService.get<string>('BD_DATABASE'),
      synchronize: true,
      autoLoadEntities: true,
      // ssl: isSSL,
      // extra: isSSL ? { ssl: { rejectUnauthorized: false } } : undefined,
    };
  }
}
