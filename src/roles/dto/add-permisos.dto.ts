import { IsArray, IsUUID } from 'class-validator';

export class AddPermisosDto {
  @IsArray()
  @IsUUID('4', { each: true })
  permisosIds: string[];
}
