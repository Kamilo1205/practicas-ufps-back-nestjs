import { IsNotEmpty, IsNumberString, IsUUID } from 'class-validator';

export class CreateEstudianteAreaInteresDto {
  @IsUUID()
  @IsNotEmpty()
  areaInteresId: string;
  
  @IsNumberString()
  @IsNotEmpty()
  nivelInteres: number;
}