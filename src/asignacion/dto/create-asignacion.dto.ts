import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAsignacionDto {
  @IsUUID('4')
  @IsNotEmpty()
  estudianteId: string;

  @IsUUID('4')
  @IsNotEmpty()
  solicitudId: string;

  @IsUUID('4')
  @IsOptional()
  tutorId: string;

  @IsString()
  @IsOptional()
  estado: string;
}
