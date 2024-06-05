import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIndustriaDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;
}
