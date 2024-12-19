import { PaginatedRequest } from '../../../core/type/requests.type';
import { EnumFilter, RangeFilter, TextFilter } from '../../../core/type/filters.type';
import { LorcanaCardsType } from './lorcana-cards.types';
import { MtgCardsType } from './mtg-cards.types';

type FilterValue = EnumFilter | TextFilter | RangeFilter | string;

export interface ICardsListFilters {
  [key: string]: FilterValue;
}

export type ICardsListParams = PaginatedRequest<ICardsListFilters>;

export type ICardsListResponse = Partial<LorcanaCardsType | MtgCardsType>;
