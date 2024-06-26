import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, GoogleStrategy, LocalStrategy, JwtRefreshTokenStrategy } from './strategies';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { RolesModule } from 'src/roles/roles.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [PassportModule, UsuariosModule, JwtModule, RolesModule, MailModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
