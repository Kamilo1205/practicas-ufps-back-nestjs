import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateComentarioDto {
  @IsString()
  @IsNotEmpty()
  texto: string;
    
  @IsOptional()
  @IsString()
  objetivoId?: string;  
  
  @IsOptional()
  @IsString()
  actividadId?: string;  
  
  @IsOptional()
  @IsString()
  subActividadId?: string;
}
