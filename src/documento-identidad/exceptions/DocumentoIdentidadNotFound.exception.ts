import { NotFoundException } from '@nestjs/common';
 
export class DocumentoIdentidadNotFoundException extends NotFoundException {
  constructor(documentoIdentidadId: string) {
    super(`Documento de identidad con id ${documentoIdentidadId} no encontrado`);
  }
}