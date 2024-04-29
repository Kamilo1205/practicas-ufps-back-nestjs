import { NotFoundException } from '@nestjs/common';
 
export class EstudianteEpsNotFoundException extends NotFoundException {
  constructor(estudianteEpsId: string) {
    super(`Estudiante Eps cond id ${ estudianteEpsId } no encontrado`);
  }
}