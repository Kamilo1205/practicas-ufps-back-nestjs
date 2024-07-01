import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjetivosService } from './objetivos.service';
import { ObjetivosController } from './objetivos.controller';
import { Objetivo } from './entities/objetivo.entity';
import { SemestreModule } from 'src/semestre/semestre.module';
import { PlanDeTrabajoModule } from 'src/plan-de-trabajo/plan-de-trabajo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Objetivo]),
    PlanDeTrabajoModule,
    SemestreModule
  ],
  controllers: [ObjetivosController],
  providers: [ObjetivosService],
})
export class ObjetivosModule {}
