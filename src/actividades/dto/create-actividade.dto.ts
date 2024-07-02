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

  @IsString()
  @IsOptional()
  estrategiaDesarrollo: string;
  
  @IsString()
  @IsOptional()
  recursosUtilizados: string;
  
  @IsString()
  @IsOptional()
  resultadosObtenidos: string;
  
  @IsString()
  @IsOptional()
  impactosPercibidos: string;
  
  @IsString()
  @IsOptional()
  limitaciones: string;
}
