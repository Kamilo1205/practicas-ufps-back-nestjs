import { IsArray, ArrayMinSize, ArrayMaxSize, IsNumberString, IsNotEmpty } from 'class-validator';

export class CreateIntensidadHorariaDto {
  @IsArray()
  @ArrayMinSize(8)
  @ArrayMaxSize(8)
  readonly horario: boolean[][];

  @IsNumberString()
  @IsNotEmpty()
  readonly cantidadSemanas: number;
}
