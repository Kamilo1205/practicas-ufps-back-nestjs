import { IsArray, IsBoolean, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEvaluacionEstudianteDto {
  @IsArray()
  @IsArray({ each: true })
  @IsBoolean({ each: true })
  @Type(() => Boolean)
  procesoDeGestion: boolean[][];

  @IsArray()
  @IsArray({ each: true })
  @IsBoolean({ each: true })
  @Type(() => Boolean)
  jefeInmediato: boolean[][];

  @IsArray()
  @IsArray({ each: true })
  @IsBoolean({ each: true })
  @Type(() => Boolean)
  empresa: boolean[][];

  @IsArray()
  @IsArray({ each: true })
  @IsBoolean({ each: true })
  @Type(() => Boolean)
  aporteRealizacion: boolean[][];

  @IsString()
  @IsNotEmpty()
  comentarios: string;
}
