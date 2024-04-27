import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  permisosIds: string[];
}
