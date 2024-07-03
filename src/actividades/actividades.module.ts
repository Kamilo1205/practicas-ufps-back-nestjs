import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividad } from './entities/actividad.entity';
import { ActividadesService } from './actividades.service';
import { ActividadesController } from './actividades.controller';
import { SemestreModule } from 'src/semestre/semestre.module';
import { PlanDeTrabajoModule } from 'src/plan-de-trabajo/plan-de-trabajo.module';
import { SeccionActividades } from './entities/seccion-actividades.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Actividad, SeccionActividades]),
    PlanDeTrabajoModule,
    SemestreModule
  ],
  controllers: [ActividadesController],
  providers: [ActividadesService],
  exports: [ActividadesService]
})
export class ActividadesModule {}
