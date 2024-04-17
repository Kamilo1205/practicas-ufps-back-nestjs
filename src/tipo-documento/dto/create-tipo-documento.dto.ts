import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoDocumentoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}
