import { PartialType } from '@nestjs/mapped-types';
import { CreateConocimientoDto } from './create-conocimiento.dto';

export class UpdateConocimientoDto extends PartialType(CreateConocimientoDto) {}
