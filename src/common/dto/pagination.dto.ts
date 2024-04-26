import { IsInt, IsNumber, Min } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @Min(1)
  page: number;
  
  @IsInt()
  @Min(1)
  limit: number;  
}