import { PartialType } from '@nestjs/mapped-types';
import { CreateIntensidadHorarioDto } from './create-intensidad-horaria.dto';

export class UpdateIntensidadHorarioDto extends PartialType(CreateIntensidadHorarioDto) {}