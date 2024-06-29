import { IsNotEmpty, IsUUID } from 'class-validator';

export class AsignarTutorDto {
  @IsUUID('4')
  @IsNotEmpty()
  tutorId: string;
}
