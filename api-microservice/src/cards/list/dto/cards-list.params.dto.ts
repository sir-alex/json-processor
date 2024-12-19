import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidFilters } from '../../../core/dto/is-valid-filter.dto';
import { Type } from 'class-transformer';
import { ICardsListFilters } from '../types/cards.types';

class FilterCondition {
  @ApiProperty({ description: 'Substring to search for', required: false })
  @IsOptional()
  @IsString()
  contains?: string;

  @ApiProperty({ description: 'Array of allowed values', required: false, type: [String] })
  @IsOptional()
  @IsArray()
  in?: any[];

  @ApiProperty({ description: 'Minimum value for range filtering', required: false })
  @IsOptional()
  @IsInt()
  min?: number;

  @ApiProperty({ description: 'Maximum value for range filtering', required: false })
  @IsOptional()
  @IsInt()
  max?: number;
}

export class CardsListParams {
  @ApiProperty({ example: {
    name: { contains: 'Ariel' },
    ink_cost: { min: 4, max: 10 },
    rarity: { in: ['Uncommon', 'Common', 'Super Rare'] },
  } as ICardsListFilters, description: 'Filter conditions for querying cards', required: false, type: Object })
  @IsOptional()
  @IsValidFilters({ message: 'Invalid filters provided' })
  @Type(() => FilterCondition)
  filters?: Record<string, FilterCondition>;

  @ApiProperty({ example: 1, description: 'Page number for pagination', required: false, minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number;

  @ApiProperty({ example: 3, description: 'Number of items per page for pagination', required: false, minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number;

  @ApiProperty({ example: ["id","name"], description: 'Fields to include in the response', required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fields?: string[];
}
