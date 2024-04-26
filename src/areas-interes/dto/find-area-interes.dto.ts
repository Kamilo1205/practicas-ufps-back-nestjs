import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindAreaInteresDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;
}
