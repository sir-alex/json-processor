import { HttpStatus } from '@nestjs/common';
import { TestCaseE2E } from '../../../../core/type/common.type';
import { ICardsListParams, ICardsListResponse } from '../../types/cards.types';
import { ROUTES } from '../../../../core/constants/routes.constant';

export const cardsErrorE2eCase: TestCaseE2E<
  ICardsListParams,
  ICardsListResponse[]
>[] = [
  {
    name: `POST show error if numeric comparisons (e.g., ranges) comes with wrong set of min-max`,
    url: `/${ROUTES.CARDS.CONTROLLER}/${ROUTES.CARDS.LIST}`,
    status: HttpStatus.BAD_REQUEST,
    method: 'POST',
    params: {
      filters: {
        ink_cost: {
          min: 777, // Wrong data
          max: 5
        }
      }
    },
  },
];
