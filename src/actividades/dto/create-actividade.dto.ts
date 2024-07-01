import { IsDateString, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateActividadeDto {
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
}
