import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateIntensidadHorarioDto } from './create-intensidad-horaria.dto';

export class CreatePlanDeTrabajoDto {
  @IsString()
  @IsNotEmpty()
  readonly objetivoPractica: string;

  @IsString()
  @IsNotEmpty()
  readonly objetivoPrincipal: string;
  
  @IsString()
  @IsNotEmpty()
  readonly objetivoEspecial: string;
  
  @IsString()
  @IsNotEmpty()
  readonly justificacion: string;
  
  @IsString()
  @IsNotEmpty()
  readonly alcance: string;

  @ValidateNested()
  @Type(() => CreateIntensidadHorarioDto)
  readonly intensidadHorario: CreateIntensidadHorarioDto;
}
