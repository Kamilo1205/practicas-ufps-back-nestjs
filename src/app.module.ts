import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmConfigService } from './config/database.config';
import { JwtAuthGuard, RolesGuard } from './auth/guards';

import { AuthModule } from './auth/auth.module';
import { EmpresasModule } from './empresas/empresas.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { GoogleDriveModule } from './google-drive/google-drive.module';
import { MailModule } from './mail/mail.module';
import { RolesModule } from './roles/roles.module';
import { TipoDocumentoModule } from './tipo-documento/tipo-documento.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EpsModule } from './eps/eps.module';
import { AreasInteresModule } from './areas-interes/areas-interes.module';
import { DocumentosModule } from './documentos/documentos.module';
import { TipoAfiliacionEpsModule } from './tipo-afiliacion-eps/tipo-afiliacion-eps.module';
import { DecanoModule } from './decano/decano.module';
import { RepresentanteLegalModule } from './representante-legal/representante-legal.module';
import { TutoresModule } from './tutores/tutores.module';
import { AnioModule } from './anio/anio.module';
import { SemestreModule } from './semestre/semestre.module';
import { SeederModule } from './seeder/seeder.module';
import { HerramientasModule } from './herramientas/herramientas.module';
import { CsvModule } from './csv/csv.module';
import { IndustriasModule } from './industrias/industrias.module';
import { PaisesModule } from './paises/paises.module';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { CiudadesModule } from './ciudades/ciudades.module';
import { EstudianteAreaInteresModule } from './estudiante-area-interes/estudiante-area-interes.module';
import { AreaInteresHerramientasModule } from './area-interes-herramientas/area-interes-herramientas.module';
import { EmpresasSolicitudesModule } from './empresas-solicitudes/empresas-solicitudes.module';
import { AsignacionModule } from './asignacion/asignacion.module';
import { PlanDeTrabajoModule } from './plan-de-trabajo/plan-de-trabajo.module';
import { TutorInstitucionalModule } from './tutor-institucional/tutor-institucional.module';
import { ObjetivosModule } from './objetivos/objetivos.module';
import { ActividadesModule } from './actividades/actividades.module';
import { SubActividadesModule } from './sub-actividades/sub-actividades.module';
import { IntensidadHorariaModule } from './intensidad-horaria/intensidad-horaria.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { GrupoPracticasModule } from './grupo-practicas/grupo-practicas.module';
import { DirectorModule } from './director/director.module';
import { InformeModule } from './informe/informe.module';
import { EvaluacionEstudianteModule } from './evaluacion-estudiante/evaluacion-estudiante.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    ScheduleModule.forRoot(),
    // Modulos
    AuthModule,
    EmpresasModule,
    EstudiantesModule,
    GoogleDriveModule,
    MailModule,
    RolesModule,
    TipoDocumentoModule,
    UsuariosModule,
    EpsModule,
    AreasInteresModule,
    DocumentosModule,
    TipoAfiliacionEpsModule,
    DecanoModule,
    RepresentanteLegalModule,
    TutoresModule,
    AnioModule,
    SemestreModule,
    SeederModule,
    HerramientasModule,
    CsvModule,
    IndustriasModule,
    PaisesModule,
    DepartamentosModule,
    CiudadesModule,
    EstudianteAreaInteresModule,
    AreaInteresHerramientasModule,
    EmpresasSolicitudesModule,
    AsignacionModule,
    PlanDeTrabajoModule,
    TutorInstitucionalModule,
    ObjetivosModule,
    ActividadesModule,
    SubActividadesModule,
    IntensidadHorariaModule,
    ComentariosModule,
    GrupoPracticasModule,
    DirectorModule,
    InformeModule,
    EvaluacionEstudianteModule
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
  ],
})
export class AppModule {}
