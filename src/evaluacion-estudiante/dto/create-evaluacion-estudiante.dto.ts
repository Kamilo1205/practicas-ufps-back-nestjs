import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEvaluacionEstudianteDto {
  @IsArray()
  procesoDeGestion: boolean[][];

  @IsArray()
  jefeInmediato: boolean[][];

  @IsArray()
  empresa: boolean[][];

  @IsArray()
  aporteRealizacion: boolean[][];

  @IsString()
  @IsNotEmpty()
  comentarios: string;
}
