import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateTutorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
  
  @IsString()
  @IsNotEmpty()
  apellidos: string;
  
  @IsPhoneNumber()
  @IsNotEmpty()
  telefono: string;
  
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  direccionTrabajo: string;
}
