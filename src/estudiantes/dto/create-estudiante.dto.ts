import { IsDateString, IsMobilePhone, IsNotEmpty, IsNumberString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateEstudianteDto {
  @IsNotEmpty()
  @IsString()
  primerNombre: string;

  @IsOptional()
  @IsString()
  segundoNombre: string;

  @IsNotEmpty()
  @IsString()
  primerApellido: string;

  @IsNotEmpty()
  @IsString()
  segundoApellido: string;
  
  @IsNotEmpty()
  @IsString()
  genero: string;
  
  @IsNotEmpty()
  @IsString()
  direccion: string;
  
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
  lugarExpedicionDocumento: string;

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

  @IsNotEmpty()
  @IsString()
  grupo: string;
}
