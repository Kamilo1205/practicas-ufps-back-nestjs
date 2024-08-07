import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInformeDto {
  @IsString()
  @IsNotEmpty()
  adaptacion: string;
  
  @IsString()
  @IsNotEmpty()
  tolerancia: string;
  
  @IsString()
  @IsNotEmpty()
  compromisoEficiencia: string;
  
  @IsString()
  @IsNotEmpty()
  conclusion: string;

  @IsString()
  @IsNotEmpty()
  nuevasResponsabilidades: string;
  
  @IsString()
  @IsNotEmpty()
  fueronAsumidas: string;
}
