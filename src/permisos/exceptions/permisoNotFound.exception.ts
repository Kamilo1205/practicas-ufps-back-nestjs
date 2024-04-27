import { NotFoundException } from '@nestjs/common';
 
export class PermisoNotFoundException extends NotFoundException {
  constructor(permisoId: string) {
    super(`Permiso con id ${ permisoId } no encontrado`);
  }
}