import { PartialType } from '@nestjs/mapped-types';
import { CreateRepresentanteLegalDto } from './create-representante-legal.dto';

export class UpdateRepresentanteLegalDto extends PartialType(CreateRepresentanteLegalDto) {}
