import { IsNotEmpty, IsNumber } from 'class-validator';
import { AreaInteres } from 'src/areas-interes/entities/area-interes.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';

export class CreateEstudianteAreaInteresDto {
  @IsNotEmpty()
  @IsNumber()
  nivelInteres: number;

  @IsNotEmpty()
  estudiante: Estudiante;

  @IsNotEmpty()
  areaInteres: AreaInteres;
}