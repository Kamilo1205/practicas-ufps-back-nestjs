import { IsNotEmpty, IsString } from "class-validator"

export class CreateObjetivoDto {
  @IsString()
  @IsNotEmpty()
  objetivoPractica: string;
  
  @IsString()
  @IsNotEmpty()
  objetivoPrincipal: string;
  
  @IsString()
  @IsNotEmpty()
  objetivoEspecial: string;
  
  @IsString()
  @IsNotEmpty()
  justificacion: string;
  
  @IsString()
  @IsNotEmpty()
  alcance: string;
}
