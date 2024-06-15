import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpresaSolicitudDto } from './create-empresa-solicitud.dto';

export class UpdateEmpresaSolicitudDto extends PartialType(CreateEmpresaSolicitudDto) {}
