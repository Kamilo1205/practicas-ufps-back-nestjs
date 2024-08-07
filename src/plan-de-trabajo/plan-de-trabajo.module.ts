import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanDeTrabajoService } from './plan-de-trabajo.service';
import { PlanDeTrabajoController } from './plan-de-trabajo.controller';
import { PlanDeTrabajo } from './entities/plan-de-trabajo.entity';
import { EstudiantesModule } from 'src/estudiantes/estudiantes.module';
import { SemestreModule } from 'src/semestre/semestre.module';
import { TutoresModule } from 'src/tutores/tutores.module';
import { TutorInstitucionalModule } from 'src/tutor-institucional/tutor-institucional.module';
import { AsignacionModule } from 'src/asignacion/asignacion.module';
import { InformeModule } from 'src/informe/informe.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlanDeTrabajo]),
    EstudiantesModule,
    SemestreModule,
    TutoresModule,
    TutorInstitucionalModule,
    AsignacionModule,
    InformeModule
  ],
  controllers: [PlanDeTrabajoController],
  providers: [PlanDeTrabajoService],
  exports: [PlanDeTrabajoService]
})
export class PlanDeTrabajoModule {}
