import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateDocumentoIdentidadDto {
  @IsNotEmpty()
  @IsString()
  numero: string;

  @IsNotEmpty()
  @IsDateString()
  fechaExpedicion: string;

  @IsNotEmpty()
  @IsString()
  lugarExpedicion: string;

  @IsNotEmpty()
  @IsString()
  tipoDocumentoId: string;

  @IsNotEmpty()
  @IsString()
  folderId: string;
}
