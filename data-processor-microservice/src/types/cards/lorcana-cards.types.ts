import { CardBasicTypes } from './card-basic.types';

export type LorcanaCardsRarity = 'Common' | 'Enchanted' | 'Legendary' | 'Promo' | 'Rare' | 'Super Rare' | 'Uncommon';

export interface LorcanaCardsType extends CardBasicTypes {
  rarity: LorcanaCardsRarity;
  ink_cost: number;
}
