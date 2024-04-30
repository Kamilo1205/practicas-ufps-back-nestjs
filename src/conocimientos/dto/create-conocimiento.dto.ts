import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConocimientoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}
