import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateResultadoDto } from './create-resultado.dto';

export class CreateResultadosDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateResultadoDto)
  resultados: CreateResultadoDto[];
}