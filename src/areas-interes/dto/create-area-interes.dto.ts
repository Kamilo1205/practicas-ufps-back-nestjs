import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAreaInteresDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsUUID('4')
  @IsOptional()
  areaPadre?: string;
}
