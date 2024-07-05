import { IsArray, IsDateString, IsNotEmpty, IsNumberString, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEstudianteAreaInteresDto } from './create-estudiante-area-interes.dto';

export class CreateEstudianteDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
  
  @IsNotEmpty()
  @IsString()
  apellidos: string;

  @IsNotEmpty()
  @IsString()
  genero: string;
  
  @IsNotEmpty()
  @IsString()
  direccionResidencia: string;
  
  @IsNotEmpty()
  @IsString()
  telefono: string;
  
  @IsNotEmpty()
  @IsString()
  ciudadResidenciaId: string;
  
  @IsNotEmpty()
  @IsDateString()  
  fechaNacimiento: Date;

  @IsNotEmpty()
  @IsString()
  numeroDocumento: string;

  @IsNotEmpty()
  @IsUUID('4')
  tipoDocumentoId: string;  

  @IsNotEmpty()
  @IsString()
  lugarExpedicionDocumentoId: string;

  @IsNotEmpty()
  @IsUUID('4')
  tipoAfiliacionEpsId: string;

  @IsNotEmpty()
  @IsDateString()
  fechaExpedicionDocumento: Date;

  @IsNotEmpty()
  @IsUUID()
  epsId: string;

  @IsNotEmpty()
  @IsDateString()
  fechaAfiliacionEps: Date;
    
  @IsNotEmpty()
  @IsNumberString()
  semestreMatriculado: number;
  
  @IsNotEmpty()
  @IsNumberString()
  codigo: number; 

  @ValidateNested({ each: true })
  @Type(() => CreateEstudianteAreaInteresDto)
  @IsArray()
  @IsNotEmpty()
  areasInteres: CreateEstudianteAreaInteresDto[];

  @IsArray()
  @IsUUID('4', { each: true })
  @IsNotEmpty({ each: true })
  herramientas: string[];
}
