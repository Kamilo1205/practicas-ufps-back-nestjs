import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHerramientaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
