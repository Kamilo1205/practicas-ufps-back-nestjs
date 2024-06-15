import { IsArray, IsBooleanString, IsNotEmpty, IsNumberString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEmpresaSolicitudAreaInteresDto } from './create-empresa-solicitud-area-interes.dto';

export class CreateEmpresaSolicitudDto { 
  @IsArray()
  @IsUUID('4', { each: true })
  @IsNotEmpty({ each: true })
  herramientas: string[];
  
  @ValidateNested({ each: true })
  @Type(() => CreateEmpresaSolicitudAreaInteresDto)
  @IsArray()
  @IsNotEmpty()
  areasInteres: CreateEmpresaSolicitudAreaInteresDto[];

  @IsNumberString()
  @IsNotEmpty()
  cantidadEstudiantes: number;
  
  @IsBooleanString()
  @IsNotEmpty()
  esRenumerado: boolean;
}
