import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAreaInteresHerramientaDto {
  @IsUUID()
  @IsNotEmpty()
  readonly areaInteresId: string;
  
  @IsUUID()
  @IsNotEmpty()
  readonly herramientaId: string;
}
