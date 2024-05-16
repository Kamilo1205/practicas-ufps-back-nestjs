import { IsDateString, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class CreateEstudianteDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;
  
  @IsNotEmpty()
  @IsString()
  genero: string;
  
  @IsNotEmpty()
  @IsString()
  direccion: string;
  
  @IsNotEmpty()
  @IsMobilePhone()
  telefono: string;
  
  @IsNotEmpty()
  @IsString()
  departamento: string;
  
  @IsNotEmpty()
  @IsString()
  municipio: string;
  
  @IsNotEmpty()
  @IsDateString()  
  fechaNacimiento: Date;
}
