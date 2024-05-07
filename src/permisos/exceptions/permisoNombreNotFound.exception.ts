import { NotFoundException } from '@nestjs/common';
 
export class PermisoNombreNotFoundException extends NotFoundException {
  constructor(nombre: string) {
    super(`Permiso "${ nombre }" no encontrado`);
  }
}