import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role) // Valida que el valor de rol sea uno de los valores del enum Role
  rol: Role;

  @IsOptional()
  @IsBoolean()
  estaActivo: boolean;

  @IsOptional()
  @IsDate()
  emailConfirmado: Date;

  @IsOptional()
  @IsString()
  currentHashedRefreshToken: string;

  @IsOptional()
  @IsBoolean()
  estaRegistrado: boolean;
}
