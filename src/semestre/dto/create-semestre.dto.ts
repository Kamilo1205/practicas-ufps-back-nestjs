import { IsDateString, IsNotEmpty, IsNumberString, IsOptional, IsUUID } from "class-validator"

export class CreateSemestreDto {
  @IsNotEmpty()
  @IsUUID('4')
  anioId: string;

  @IsNotEmpty()
  @IsNumberString()
  semestre: number;

  @IsOptional()
  @IsDateString()
  fechaInicio?: Date;

  @IsOptional()
  @IsDateString()
  fechaFin?: Date;
}
