import { IsBoolean, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateAnioDto {
  @IsNumberString()
  @IsNotEmpty()
  readonly anio: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly actual: boolean;
}
