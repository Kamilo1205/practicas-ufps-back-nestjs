import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividad } from './entities/actividade.entity';
import { ActividadesService } from './actividades.service';
import { ActividadesController } from './actividades.controller';
import { PlanDeTrabajo } from 'src/plan-de-trabajo/entities/plan-de-trabajo.entity';
import { SemestreModule } from 'src/semestre/semestre.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Actividad]),
    PlanDeTrabajo,
    SemestreModule
  ],
  controllers: [ActividadesController],
  providers: [ActividadesService],
  exports: [ActividadesService]
})
export class ActividadesModule {}
