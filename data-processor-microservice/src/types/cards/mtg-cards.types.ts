import { CardBasicTypes } from './card-basic.types';

export type MtgCardsColor = 'U' | 'B' | 'G' | 'R' | 'W';

export type MtgCardsRarity = 'common' | 'mythic' | 'rare' | 'special' | 'uncommon';

export interface MtgCardsType extends CardBasicTypes {
  color?: MtgCardsColor;
  rarity: MtgCardsRarity;
}
