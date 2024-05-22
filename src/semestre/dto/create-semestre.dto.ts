import { IsDateString, IsNotEmpty, IsNumberString, IsUUID } from "class-validator"

export class CreateSemestreDto {
  @IsNotEmpty()
  @IsUUID('4')
  anioId: string;

  @IsNotEmpty()
  @IsNumberString()
  semestre: number;

  @IsNotEmpty()
  @IsDateString()
  fechaInicio: string;

  @IsNotEmpty()
  @IsDateString()
  fechaFin: string;
}
