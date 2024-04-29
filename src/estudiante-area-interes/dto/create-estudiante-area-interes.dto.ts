import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateEstudianteAreaIntereDto {
  @IsNotEmpty()
  @IsUUID()
  estudianteId: string;
  
  @IsNotEmpty()
  @IsUUID()
  areaInteresId: string;
  
  @IsNotEmpty()
  @IsNumber()
  nivelInteres: number;
}
