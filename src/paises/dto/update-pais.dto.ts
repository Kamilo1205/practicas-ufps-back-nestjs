import { PartialType } from '@nestjs/mapped-types';
import { CreatePaiseDto } from './create-pais.dto';

export class UpdatePaiseDto extends PartialType(CreatePaiseDto) {}
