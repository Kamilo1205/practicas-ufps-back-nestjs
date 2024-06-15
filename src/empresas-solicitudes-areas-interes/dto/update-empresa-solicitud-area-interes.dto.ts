import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpresaSolicitudAreaInteresDto } from './create-empresa-solicitud-area-intere.dto';

export class UpdateEmpresSolicitudAreaInteresDto extends PartialType(CreateEmpresaSolicitudAreaInteresDto) {}
