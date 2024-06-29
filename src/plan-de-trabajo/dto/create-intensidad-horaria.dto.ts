import { IsArray, ArrayMinSize, ArrayMaxSize, IsNumberString, IsNotEmpty } from 'class-validator';

export class CreateIntensidadHorarioDto {
  @IsArray()
  @ArrayMinSize(8)
  @ArrayMaxSize(8)
  readonly horario: boolean[][];

  @IsNumberString()
  @IsNotEmpty()
  readonly cantidadSemanas: number;
}
