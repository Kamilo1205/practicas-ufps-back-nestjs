import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { Estudiante } from './entities/estudiante.entity';
import { CiudadesModule } from 'src/ciudades/ciudades.module';
import { AreasInteresModule } from 'src/areas-interes/areas-interes.module';
import { EpsModule } from 'src/eps/eps.module';
import { TipoAfiliacionEpsModule } from 'src/tipo-afiliacion-eps/tipo-afiliacion-eps.module';
import { TipoDocumentoModule } from 'src/tipo-documento/tipo-documento.module';
import { EstudianteAreaInteresModule } from 'src/estudiante-area-interes/estudiante-area-interes.module';
import { GoogleDriveModule } from 'src/google-drive/google-drive.module';
import { SemestreModule } from 'src/semestre/semestre.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { HerramientasModule } from 'src/herramientas/herramientas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Estudiante]),
    CiudadesModule,
    AreasInteresModule,
    EpsModule,
    TipoAfiliacionEpsModule,
    TipoDocumentoModule,
    EstudianteAreaInteresModule,
    GoogleDriveModule,
    SemestreModule,
    UsuariosModule,
    HerramientasModule
  ],
  controllers: [EstudiantesController],
  providers: [EstudiantesService],
  exports: [EstudiantesService]
})
export class EstudiantesModule {}
