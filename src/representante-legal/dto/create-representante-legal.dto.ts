import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID } from 'class-validator';

export class CreateRepresentanteLegalDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
 
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsNotEmpty()
  @IsString()
  numeroDocumento: string;

  @IsNotEmpty()
  @IsDateString()
  fechaExpedicionDocumento: Date;
  
  @IsNotEmpty()
  @IsString()
  lugarExpedicionDocumentoId: string;
  
  @IsOptional()
  @IsString()
  documentoIdentidadUrl: string;

  @IsNotEmpty()
  @IsUUID('4')
  tipoDocumentoId: string;
}
