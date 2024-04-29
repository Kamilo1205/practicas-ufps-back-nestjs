import { NotFoundException } from '@nestjs/common';
 
export class TipoAfiliacionEpsNotFoundException extends NotFoundException {
  constructor(tipoAfiliacionEpsId: string) {
    super(`Tipo de afiliacion con id ${ tipoAfiliacionEpsId } no encontrado`);
  }
}