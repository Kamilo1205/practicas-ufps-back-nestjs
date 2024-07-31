import { IsNotEmpty, IsUUID } from 'class-validator';

export class DesasignarDto {
  @IsUUID('4')
  @IsNotEmpty()
  estudianteId: string;

  @IsUUID('4')
  @IsNotEmpty()
  solicitudId: string;
}
