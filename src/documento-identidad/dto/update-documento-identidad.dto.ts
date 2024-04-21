import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentoIdentidadDto } from './create-documento-identidad.dto';

export class UpdateDocumentoIdentidadDto extends PartialType(CreateDocumentoIdentidadDto) {}
