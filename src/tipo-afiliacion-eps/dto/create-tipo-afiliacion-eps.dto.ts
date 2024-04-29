import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoAfiliacionEpsDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}
