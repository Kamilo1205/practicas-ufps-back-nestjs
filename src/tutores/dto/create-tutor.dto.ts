import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsUUID } from 'class-validator';

export class CreateTutorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
  
  @IsString()
  @IsNotEmpty()
  apellidos: string;
  
  @IsString()
  @IsNotEmpty()
  telefono: string;
  
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  direccionTrabajo: string;

  @IsUUID('4')
  @IsNotEmpty()
  empresaId: string;
}
