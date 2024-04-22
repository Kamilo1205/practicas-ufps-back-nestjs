import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmConfigService } from './config/database.config';
import { JwtAuthGuard, RolesGuard, PermisosGuard } from './auth/guards';

import { AuthModule } from './auth/auth.module';
import { DocumentoIdentidadModule } from './documento-identidad/documento-identidad.module';
import { EmpresasModule } from './empresas/empresas.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { GoogleDriveModule } from './google-drive/google-drive.module';
import { MailModule } from './mail/mail.module';
import { PermisosModule } from './permisos/permisos.module';
import { RepresentanteLegalModule } from './representante-legal/representante-legal.module';
import { RolesModule } from './roles/roles.module';
import { TipoDocumentoModule } from './tipo-documento/tipo-documento.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    // Modulos
    AuthModule,
    DocumentoIdentidadModule,
    EmpresasModule,
    EstudiantesModule,
    GoogleDriveModule,
    MailModule,
    PermisosModule,
    RepresentanteLegalModule,
    RolesModule,
    TipoDocumentoModule,
    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermisosGuard,
    },
  ],
})
export class AppModule {}
