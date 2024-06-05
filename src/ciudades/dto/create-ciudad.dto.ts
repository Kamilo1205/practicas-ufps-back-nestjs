import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCiudadDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsUUID('4')
  @IsNotEmpty()
  departamentoId: string;
}
