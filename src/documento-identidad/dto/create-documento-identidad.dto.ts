import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

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
  @IsUUID()
  tipoDocumentoId: string;
}
