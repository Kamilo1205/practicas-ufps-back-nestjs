import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteAreaIntereDto } from './create-estudiante-area-interes.dto';

export class UpdateEstudianteAreaIntereDto extends PartialType(CreateEstudianteAreaIntereDto) {}
