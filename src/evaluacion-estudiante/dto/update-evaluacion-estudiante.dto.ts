import { PartialType } from '@nestjs/mapped-types';
import { CreateEvaluacionEstudianteDto } from './create-evaluacion-estudiante.dto';

export class UpdateEvaluacionEstudianteDto extends PartialType(CreateEvaluacionEstudianteDto) {}