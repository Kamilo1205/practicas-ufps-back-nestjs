import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanDeTrabajoService } from './plan-de-trabajo.service';
import { PlanDeTrabajoController } from './plan-de-trabajo.controller';
import { PlanDeTrabajo } from './entities/plan-de-trabajo.entity';
import { EstudiantesModule } from 'src/estudiantes/estudiantes.module';
import { SemestreModule } from 'src/semestre/semestre.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlanDeTrabajo]),
    EstudiantesModule,
    SemestreModule
  ],
  controllers: [PlanDeTrabajoController],
  providers: [PlanDeTrabajoService],
  exports: [PlanDeTrabajoService]
})
export class PlanDeTrabajoModule {}
