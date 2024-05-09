import { IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;
  
  @IsOptional()
  @IsString()
  imagenUrl: string;

  @IsOptional()
  @IsString()
  displayName: string;
  
  @IsOptional()
  @IsBoolean()
  estaActivo: boolean;

  @IsOptional()
  @IsDate()
  emailConfirmado: Date;

  @IsOptional()
  @IsBoolean()
  estaRegistrado: boolean;

  @IsNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  rolesIds: string[];
}
