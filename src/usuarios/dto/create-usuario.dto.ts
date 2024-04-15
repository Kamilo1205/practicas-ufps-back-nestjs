import {
  IsBoolean,
  IsDate,
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

  @IsOptional()
  @IsBoolean()
  estaActivo: boolean;

  @IsOptional()
  @IsDate()
  emailConfirmado: Date;

  @IsOptional()
  @IsBoolean()
  estaRegistrado: boolean;
}
