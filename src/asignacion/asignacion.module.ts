import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsignacionService } from './asignacion.service';
import { AsignacionController } from './asignacion.controller';
import { Asignacion } from './entities/asignacion.entity';
import { TutoresModule } from 'src/tutores/tutores.module';
import { EstudiantesModule } from 'src/estudiantes/estudiantes.module';
import { EmpresasSolicitudesModule } from 'src/empresas-solicitudes/empresas-solicitudes.module';
import { SemestreModule } from 'src/semestre/semestre.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Asignacion]),
    EmpresasSolicitudesModule, 
    EstudiantesModule,
    SemestreModule,
    TutoresModule,
  ],
  controllers: [AsignacionController],
  providers: [AsignacionService],
})
export class AsignacionModule {}
