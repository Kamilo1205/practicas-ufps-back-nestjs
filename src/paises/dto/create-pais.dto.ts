import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaiseDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
