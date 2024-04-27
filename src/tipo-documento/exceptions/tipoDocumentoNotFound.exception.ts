import { NotFoundException } from '@nestjs/common';
 
export class TipoDocumentoNotFoundException extends NotFoundException {
  constructor(tipoDocumentoId: string) {
    super(`Tipo de documento con id ${ tipoDocumentoId } no encontrado`);
  }
}