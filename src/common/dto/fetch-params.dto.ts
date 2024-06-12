import { IsOptional, IsArray, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class SortRule {
  @IsString()
  id: string;

  @IsString()
  desc: string;
}

export class FetchParamsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsArray()
  sort?: SortRule[];

  @IsOptional()
  filters?: { [key: string]: string };

  @IsOptional()
  @IsString()
  search?: string;
}
