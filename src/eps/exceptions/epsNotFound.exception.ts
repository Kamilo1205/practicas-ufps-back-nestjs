import { NotFoundException } from '@nestjs/common';
 
export class EpsNotFoundException extends NotFoundException {
  constructor(epsId: string) {
    super(`Eps con id ${ epsId } no encontrado`);
  }
}