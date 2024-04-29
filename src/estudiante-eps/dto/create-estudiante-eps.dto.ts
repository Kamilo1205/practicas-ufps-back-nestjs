import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateEstudianteEpsDto {
  @IsNotEmpty()
  @IsUUID()
  estudianteId: string;

  @IsNotEmpty()
  @IsUUID()
  epsId: string;

  @IsNotEmpty()
  @IsUUID()
  tipoAfiliacionEpsId: string;

  @IsNotEmpty()
  @IsDateString()
  fechaAfiliacion: string;
}
