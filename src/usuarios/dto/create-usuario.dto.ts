import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  rol: string;

  @IsBoolean()
  estaActivo: boolean;

  @IsOptional()
  emailConfirmado: Date;

  @IsBoolean()
  estaRegistrado: boolean;
}
