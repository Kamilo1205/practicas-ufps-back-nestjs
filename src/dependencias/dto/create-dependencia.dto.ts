import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDependencia {
  @IsString()
  @IsNotEmpty()
  nombre: string;
  
  @IsString()
  @IsNotEmpty()
  codigo: string;
  
  @IsString()
  @IsNotEmpty()
  personaACargo: string;
}