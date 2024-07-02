import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGrupoPracticaDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;
}
