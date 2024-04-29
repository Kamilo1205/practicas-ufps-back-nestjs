import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoAfiliacionEpsDto } from './create-tipo-afiliacion-eps.dto';

export class UpdateTipoAfiliacionEpsDto extends PartialType(CreateTipoAfiliacionEpsDto) {}
