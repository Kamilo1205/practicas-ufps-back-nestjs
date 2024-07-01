import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividad } from './entities/actividade.entity';
import { ActividadesService } from './actividades.service';
import { ActividadesController } from './actividades.controller';
import { PlanDeTrabajo } from 'src/plan-de-trabajo/entities/plan-de-trabajo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Actividad]),
    PlanDeTrabajo
  ],
  controllers: [ActividadesController],
  providers: [ActividadesService],
})
export class ActividadesModule {}
