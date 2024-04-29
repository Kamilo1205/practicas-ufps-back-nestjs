import { NotFoundException } from '@nestjs/common';
 
export class EstudianteAreaInteresNotFoundException extends NotFoundException {
  constructor(estudianteAreaInteresId: string) {
    super(`Area de interes del estudiante con el id ${ estudianteAreaInteresId } no encontrado`);
  }
}