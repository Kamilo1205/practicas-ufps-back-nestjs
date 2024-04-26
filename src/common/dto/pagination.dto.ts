import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number;
  
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit: number;  
}