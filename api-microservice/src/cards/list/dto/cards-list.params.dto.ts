import { ICardsListFilters, ICardsListParams } from '../types/cards.types';

export class CardsListParams implements ICardsListParams {
  readonly page: number = undefined;
  readonly limit: number = undefined;
  readonly filters: ICardsListFilters = undefined;
}
