import { NotFoundException } from '@nestjs/common';
 
export class RolNotFoundException extends NotFoundException {
  constructor(rolId: string) {
    super(`Rol con id ${ rolId } no encontrado`);
  }
}