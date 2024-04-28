import { NotFoundException } from '@nestjs/common';
 
export class RolNombreNotFoundException extends NotFoundException {
  constructor(nombre: string) {
    super(`Rol con nombre "${ nombre }" no encontrado`);
  }
}