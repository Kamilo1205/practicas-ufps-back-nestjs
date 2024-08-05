import { IsNotEmpty, IsString } from "class-validator"

export class CreateResultadoDto {
  @IsString()
  @IsNotEmpty()
  resultado: string;
  
  @IsString()
  @IsNotEmpty()
  indicador: string;
}