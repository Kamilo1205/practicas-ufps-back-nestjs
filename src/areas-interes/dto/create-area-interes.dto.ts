import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAreaInteresDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
}
