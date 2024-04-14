import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get<'mysql' | 'postgres'>('BD_TYPE'),
      host: this.configService.get<string>('BD_HOST'),
      port: +this.configService.get<number>('BD_PORT'),
      username: this.configService.get<string>('BD_NAME'),
      password: this.configService.get<string>('BD_PASSWORD'),
      database: this.configService.get<string>('BD_DATABASE'),
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}
