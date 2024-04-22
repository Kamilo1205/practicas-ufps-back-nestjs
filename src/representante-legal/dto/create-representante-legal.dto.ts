import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateRepresentanteLegalDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
