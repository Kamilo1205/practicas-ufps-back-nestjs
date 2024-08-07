import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateComentarioDto {
  @IsString()
  @IsNotEmpty()
  comentario: string;
    
  @IsOptional()
  @IsString()
  objetivoId?: string;  
  
  @IsOptional()
  @IsString()
  seccionActividadesId?: string;  
}
