import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
  
export class CreateUsuarioEmpresaDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;
}
  