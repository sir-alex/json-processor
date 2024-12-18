import Joi from 'joi';
import { MtgCardsType } from '../types/cards/mtg-cards.types';

export const mtgCardsSchema = Joi.object<MtgCardsType>({
  color: Joi.string().valid('U', 'B', 'G', 'R', 'W').optional(),
  name: Joi.string().required(),
  rarity: Joi.string().valid('common', 'mythic', 'rare', 'special', 'uncommon').required(),
  id: Joi.string().required(),
});

export const mtgCardsArrSchema = Joi.array<MtgCardsType>().items(mtgCardsSchema);
