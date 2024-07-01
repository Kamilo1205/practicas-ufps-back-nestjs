import { PartialType } from '@nestjs/mapped-types';
import { CreateSubActividadDto } from './create-sub-actividad.dto';

export class UpdateSubActividadDto extends PartialType(CreateSubActividadDto) {}
