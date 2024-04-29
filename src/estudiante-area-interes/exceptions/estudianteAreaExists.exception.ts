import { ConflictException } from '@nestjs/common';

export class EstudianteAreaInteresExistsException extends ConflictException {
  constructor(estudianteId: string, areaInteresId: string) {
    super(`El estudiante con id ${ estudianteId } ya tiene registrada el area de interes con id ${ areaInteresId }`);
  }
}
