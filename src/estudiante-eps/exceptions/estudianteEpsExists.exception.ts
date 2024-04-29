import { ConflictException } from '@nestjs/common';

export class EstudianteEpsExistsException extends ConflictException {
  constructor(estudianteId: string) {
    super(`El estudiante con id "${ estudianteId }" ya tiene una eps registrada`);
  }
}
