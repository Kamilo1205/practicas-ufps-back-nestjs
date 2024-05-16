import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateEmpresaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  direccion: string;

  @IsNotEmpty()
  @IsString()
  nit: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsNotEmpty()
  @IsString()
  pais: string;

  @IsNotEmpty()
  @IsString()
  departamento: string;
  
  @IsNotEmpty()
  @IsString()
  ciudad: string;

  @IsNotEmpty()
  @IsString()
  industria: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  
  @IsNotEmpty()
  @IsString()
  representanteNombre: string;
  
  // @IsNotEmpty()
  // @IsString()
  // representanteApellido: string;
  
  @IsNotEmpty()
  @IsString()
  representanteEmail: string;
  
  @IsNotEmpty()
  @IsString()
  representanteTelefono: string;
  
  @IsNotEmpty()
  @IsUUID()
  representanteTipoDocumentoId: string;
  
  @IsNotEmpty()
  @IsString()
  representanteNumeroIdentidad: string;
  
  @IsNotEmpty()
  @IsDateString()
  representanteFechaExpedicion: Date;
  
  @IsNotEmpty()
  @IsString()
  representanteLugarExpedicion: string;
}
