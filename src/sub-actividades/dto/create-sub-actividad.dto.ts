import { IsDateString, IsNotEmpty, IsNumberString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSubActividadDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;
  
  @IsString()
  @IsOptional()
  descripcion: string;
  
  @IsDateString()
  @IsOptional()
  fechaInicio: string;
  
  @IsDateString()
  @IsOptional()
  fechFin: string;
  
  @IsNumberString()
  @IsOptional()
  totalHoras: string;
  
  @IsNumberString()
  @IsOptional()
  porcentajeCompletado: string;

  @IsUUID('4')
  @IsNotEmpty()
  actividadId: string;
}
