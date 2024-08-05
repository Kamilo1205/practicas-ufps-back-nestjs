import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresasService } from './empresas.service';
import { EmpresasController } from './empresas.controller';
import { Empresa } from './entities/empresa.entity';
import { GoogleDriveModule } from 'src/google-drive/google-drive.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { RepresentanteLegalModule } from 'src/representante-legal/representante-legal.module';
import { CiudadesModule } from 'src/ciudades/ciudades.module';
import { IndustriasModule } from 'src/industrias/industrias.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Empresa]),
    GoogleDriveModule,
    UsuariosModule,
    RepresentanteLegalModule,
    IndustriasModule,
    CiudadesModule,
    MailModule
  ],
  controllers: [EmpresasController],
  providers: [EmpresasService],
  exports: [EmpresasService]
})
export class EmpresasModule {}
