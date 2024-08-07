import { IsArray, ValidateNested } from 'class-validator';

export class CreateResultadosDto {
  @IsArray()
  resultados: { resultado: string; indicador: string }[];
}