import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEvaluacionEstudianteDto {
  @IsArray()
  @IsBoolean({ each: true })
  @Type(() => Boolean)
  procesoDeGestion: boolean[][];

  @IsArray()
  @IsBoolean({ each: true })
  @Type(() => Boolean)
  jefeInmediato: boolean[][];

  @IsArray()
  @IsBoolean({ each: true })
  @Type(() => Boolean)
  empresa: boolean[][];

  @IsArray()
  @IsBoolean({ each: true })
  @Type(() => Boolean)
  aporteRealizacion: boolean[][];

  @IsString()
  @IsNotEmpty()
  comentarios: string;
}
