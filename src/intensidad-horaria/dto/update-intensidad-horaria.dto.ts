import { PartialType } from '@nestjs/mapped-types';
import { CreateIntensidadHorariaDto } from './create-intensidad-horaria.dto';

export class UpdateIntensidadHorariaDto extends PartialType(CreateIntensidadHorariaDto) {}
