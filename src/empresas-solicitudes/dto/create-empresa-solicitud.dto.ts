import { IsArray, IsBooleanString, IsNotEmpty, IsNumberString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateEmpresaSolicitudDto { 
  @IsArray()
  @IsUUID('4', { each: true })
  @IsNotEmpty({ each: true })
  herramientasIds: string[];
  
  @IsArray()
  @IsUUID('4', { each: true })
  @IsNotEmpty({ each: true })
  areasInteresIds: string[];

  @IsNumberString()
  @IsNotEmpty()
  cantidadPracticantes: number;
  
  @IsBooleanString()
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  esRenumerado: boolean;
}
