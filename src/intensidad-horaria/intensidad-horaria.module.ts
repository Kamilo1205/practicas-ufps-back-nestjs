import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntensidadHorariaService } from './intensidad-horaria.service';
import { IntensidadHorariaController } from './intensidad-horaria.controller';
import { IntensidadHoraria } from './entities/intensidad-horaria.entity';
import { PlanDeTrabajoModule } from 'src/plan-de-trabajo/plan-de-trabajo.module';
import { SemestreModule } from 'src/semestre/semestre.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([IntensidadHoraria]),
    PlanDeTrabajoModule,
    SemestreModule
  ],
  controllers: [IntensidadHorariaController],
  providers: [IntensidadHorariaService],
  exports: [IntensidadHorariaService]
})
export class IntensidadHorariaModule {}
