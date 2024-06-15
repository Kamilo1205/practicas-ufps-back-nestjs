import { IsNotEmpty, IsNumberString, IsUUID } from 'class-validator';

export class CreateEmpresaSolicitudAreaInteresDto {
  @IsUUID()
  @IsNotEmpty()
  areaInteresId: string;
  
  @IsNumberString()
  @IsNotEmpty()
  nivelInteres: number;
}