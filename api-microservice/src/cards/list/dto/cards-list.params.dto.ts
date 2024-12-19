import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { IsValidFilters } from '../../../core/dto/is-valid-filter.dto';

class FilterCondition {
  @IsOptional()
  @IsString()
  contains?: string;

  @IsOptional()
  @IsArray()
  in?: any[];

  @IsOptional()
  @IsInt()
  min?: number;

  @IsOptional()
  @IsInt()
  max?: number;
}

export class CardsListParams {
  @IsOptional()
  @IsValidFilters({ message: 'Invalid filters provided' })
  filters?: Record<string, FilterCondition>;

  @IsOptional()
  @IsInt()
  @Min(1)
  page: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fields?: string[];
}

