import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermisoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}
