import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EvaluacionEstudiante } from './entities/evaluacion-estudiante.entity';
import { EvaluacionEstudianteService } from './evaluacion-estudiante.service';

@Module({
  imports: [TypeOrmModule.forFeature([EvaluacionEstudiante])],
  providers: [EvaluacionEstudianteService],
  exports: [EvaluacionEstudianteService]
})
export class EvaluacionEstudianteModule {}
