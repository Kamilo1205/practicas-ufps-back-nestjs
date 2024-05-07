import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsArray()
  @IsUUID('4', { each: true })
  permisosIds: string[];
}
