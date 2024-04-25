import { IsUUID } from 'class-validator';

export class FindAreaInteresDto {
    @IsUUID()
    id: string;
}
