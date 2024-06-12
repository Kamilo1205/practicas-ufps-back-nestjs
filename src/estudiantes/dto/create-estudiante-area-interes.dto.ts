import { IsNotEmpty, IsNumberString, IsUUID } from 'class-validator';

export class EstudianteAreaInteresDto {
  @IsUUID()
  @IsNotEmpty()
  areaInteresId: string;
  
  @IsNumberString()
  @IsNotEmpty()
  nivelInteres: number;
}