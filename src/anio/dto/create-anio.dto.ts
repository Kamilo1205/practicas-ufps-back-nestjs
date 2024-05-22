import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateAnioDto {
  @IsNumberString()
  @IsNotEmpty()
  readonly anio: number;
}
