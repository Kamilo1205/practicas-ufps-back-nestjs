import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTutorInstitucionalDto {
  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsString()
  @IsNotEmpty()
  apellidos: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}
