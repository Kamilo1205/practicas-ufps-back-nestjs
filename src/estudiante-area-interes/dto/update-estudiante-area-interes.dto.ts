import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteAreaInteresDto } from './create-estudiante-area-interes.dto';

export class UpdateEstudianteAreaInteresDto extends PartialType(CreateEstudianteAreaInteresDto) {}
