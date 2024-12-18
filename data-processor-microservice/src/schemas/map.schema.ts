import { mtgCardsArrSchema } from './mtg-cards.schema';
import { lorcanaCardsArrSchema } from './lorcana-cards.schema';

export const getValidationSchema = (filename: string) => {
  switch (filename) {
  case 'mtg-cards.json':
    return mtgCardsArrSchema;
  case 'lorcana-cards.json':
    return lorcanaCardsArrSchema;
  default:
    return null;
  }
}
