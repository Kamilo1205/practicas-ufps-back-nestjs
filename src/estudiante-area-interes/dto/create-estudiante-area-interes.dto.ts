import { IsNotEmpty, IsNumberString } from 'class-validator';
import { AreaInteres } from 'src/areas-interes/entities/area-interes.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';

export class CreateEstudianteAreaInteresDto {
  @IsNumberString()
  @IsNotEmpty()
  nivelInteres: number;

  @IsNotEmpty()
  estudiante: Estudiante;

  @IsNotEmpty()
  areaInteres: AreaInteres;
}