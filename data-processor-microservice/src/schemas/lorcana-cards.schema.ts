import Joi from 'joi';
import { LorcanaCardsType } from '../types/cards/lorcana-cards.types';

export const lorcanaCardsSchema = Joi.object<LorcanaCardsType>({
  id: Joi.string().required(),
  name: Joi.string().required(),
  rarity: Joi.string().valid('Common', 'Enchanted', 'Legendary', 'Promo', 'Rare', 'Super Rare', 'Uncommon').required(),
  ink_cost: Joi.number().required(),
});

export const lorcanaCardsArrSchema = Joi.array<LorcanaCardsType>().items(lorcanaCardsSchema);
