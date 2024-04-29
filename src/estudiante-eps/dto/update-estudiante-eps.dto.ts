import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteEpsDto } from './create-estudiante-eps.dto';

export class UpdateEstudianteEpsDto extends PartialType(CreateEstudianteEpsDto) {}
