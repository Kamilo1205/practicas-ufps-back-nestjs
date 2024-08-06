import { IsString } from 'class-validator';

export class CreateNuevaResponsabilidadDto {
  @IsString()
  descripcion: string;
}
