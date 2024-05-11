import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Genero } from 'src/common/enums';

export class CreateDecanoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsEnum(Genero)
  genero: Genero;
  
  @IsNotEmpty()
  @IsString()
  numeroDocumento: string;

  @IsNotEmpty()
  @IsString()
  lugarExpedicionDocumento: string;
}
