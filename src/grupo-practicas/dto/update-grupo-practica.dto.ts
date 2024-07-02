import { PartialType } from '@nestjs/mapped-types';
import { CreateGrupoPracticaDto } from './create-grupo-practica.dto';

export class UpdateGrupoPracticaDto extends PartialType(CreateGrupoPracticaDto) {}
