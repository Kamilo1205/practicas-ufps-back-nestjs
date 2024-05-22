import { PartialType } from '@nestjs/mapped-types';
import { CreateAnioDto } from './create-anio.dto';

export class UpdateAnioDto extends PartialType(CreateAnioDto) {}
