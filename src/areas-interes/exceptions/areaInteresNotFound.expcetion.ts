import { NotFoundException } from '@nestjs/common';
 
export class AreaInteresNotFoundException extends NotFoundException {
  constructor(areaInteresId: string) {
    super(`Area de interes con id ${ areaInteresId } no encontrado`);
  }
}