import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEpsDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  nit: string;
}
