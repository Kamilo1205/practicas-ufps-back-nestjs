import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateDepartamentoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsUUID('4')
  @IsNotEmpty()
  paisId: string;
}
