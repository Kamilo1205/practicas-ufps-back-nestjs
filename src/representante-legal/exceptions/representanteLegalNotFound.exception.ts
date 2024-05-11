import { NotFoundException } from '@nestjs/common';
 
export class RepresentanteLegalNotFoundException extends NotFoundException {
  constructor(representanteLegalId: string) {
    super(`Representante legal con id ${representanteLegalId} no encontrado`); 
  }
}