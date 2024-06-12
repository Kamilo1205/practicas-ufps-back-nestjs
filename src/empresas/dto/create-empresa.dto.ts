import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRepresentanteLegalDto } from 'src/representante-legal/dto';

export class CreateEmpresaDto {
  @IsNotEmpty()
  @IsString()
  nombreLegal: string;

  @IsNotEmpty()
  @IsString()
  nombreComercial: string;

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
  @IsUUID('4')
  ciudadId: string;

  @IsNotEmpty()
  @IsUUID('4')
  industriaId: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateRepresentanteLegalDto)
  representante: CreateRepresentanteLegalDto;

  // @IsNotEmpty()
  // @IsString()
  // representanteNombre: string;
  
  // @IsNotEmpty()
  // @IsString()
  // representanteApellido: string;
  
  // @IsNotEmpty()
  // @IsString()
  // representanteEmail: string;
  // 
  // @IsNotEmpty()
  // @IsString()
  // representanteTelefono: string;
  // 
  // @IsNotEmpty()
  // @IsUUID()
  // representanteTipoDocumentoId: string;
  // 
  // @IsNotEmpty()
  // @IsString()
  // representanteNumeroIdentidad: string;
  // 
  // @IsNotEmpty()
  // @IsDateString()
  // representanteFechaExpedicion: Date;
  // 
  // @IsNotEmpty()
  // @IsString()
  // representanteLugarExpedicion: string;
}
