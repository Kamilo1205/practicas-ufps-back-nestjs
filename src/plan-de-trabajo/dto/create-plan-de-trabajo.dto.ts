import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlanDeTrabajoDto { 
  @IsString()
  @IsNotEmpty()
  requerimientosTecnicos: string;
}
