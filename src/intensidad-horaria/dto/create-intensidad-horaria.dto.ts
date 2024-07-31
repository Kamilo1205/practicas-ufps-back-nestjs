import { IsArray, ArrayMinSize, ArrayMaxSize, IsNumberString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateIntensidadHorariaDto {
  @IsArray()
  @ArrayMinSize(8)
  @ArrayMaxSize(8)
  readonly horario: boolean[][];

  @IsInt()
  @IsNotEmpty()
  @Min(1) 
  readonly cantidadSemanas: number;
}
