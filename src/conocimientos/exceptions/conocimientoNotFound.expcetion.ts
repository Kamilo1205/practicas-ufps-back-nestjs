import { NotFoundException } from '@nestjs/common';
 
export class ConocimientoNotFoundException extends NotFoundException {
  constructor(conocimientoId: string) {
    super(`Conocimiento con id ${ conocimientoId } no encontrado`);
  }
}