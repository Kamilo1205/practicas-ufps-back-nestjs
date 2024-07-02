import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDirectorDto {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly apellidos: string;

  @IsString()
  @IsNotEmpty()
  readonly nombres: string;
}
