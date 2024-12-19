import { HttpStatus } from '@nestjs/common';
import { TestCaseE2E } from '../../../../core/type/common.type';
import { ICardsListParams, ICardsListResponse } from '../../types/cards.types';
import { ROUTES } from '../../../../core/constants/routes.constant';

export const cardsSuccessE2eCase: TestCaseE2E<
  ICardsListParams,
  ICardsListResponse[]
>[] = [
  {
    name: `POST with id only`,
    url: `/${ROUTES.CARDS.CONTROLLER}/${ROUTES.CARDS.LIST}`,
    status: HttpStatus.OK,
    method: 'POST',
    params: {
      filters: {
        id: 'ariel-on-human-legs'
      }
    },
    response: [{
      name: "Ariel - On Human Legs",
      ink_cost: 4,
      rarity: "Uncommon",
      id: "ariel-on-human-legs"
    }] as ICardsListResponse[],
  },
  {
    name: `POST with name`,
    url: `/${ROUTES.CARDS.CONTROLLER}/${ROUTES.CARDS.LIST}`,
    status: HttpStatus.OK,
    method: 'POST',
    params: {
      filters: {
        name: 'Ariel - On Human Legs'
      }
    },
    response: [{
      name: "Ariel - On Human Legs",
      ink_cost: 4,
      rarity: "Uncommon",
      id: "ariel-on-human-legs"
    }] as ICardsListResponse[],
  },
  {
    name: `POST with partial text matches for fields like name`,
    url: `/${ROUTES.CARDS.CONTROLLER}/${ROUTES.CARDS.LIST}`,
    status: HttpStatus.OK,
    method: 'POST',
    params: {
      filters: {
        name: {
          contains: 'Ariel'
        }
      }
    },
    response: [
      {
        name: "Ariel - On Human Legs",
        ink_cost: 4,
        rarity: "Uncommon",
        id: "ariel-on-human-legs"
      },
      {
        name: "Ariel - Spectacular Singer",
        ink_cost: 3,
        rarity: "Super Rare",
        id: "ariel-spectacular-singer"
      },
    ] as ICardsListResponse[],
  },
  {
    name: `POST with one or more selected values for enum-like attributes such as color`,
    url: `/${ROUTES.CARDS.CONTROLLER}/${ROUTES.CARDS.LIST}`,
    status: HttpStatus.OK,
    method: 'POST',
    params: {
      filters: {
        color: {
          in: ['G', 'B']
        }
      }
    },
    response: [
      {
        color: "G",
        name: "\"Ach! Hans, Run!\"",
        rarity: "rare",
        id: "ach-hans-run-a2c5ee76"
      },
      {
        color: "B",
        name: "\"Brims\" Barone, Midway Mobster",
        rarity: "uncommon",
        id: "brims-barone-midway-mobster-c64c31f2"
      },
      {
        color: "G",
        name: "A Killer Among Us",
        rarity: "uncommon",
        id: "a-killer-among-us-79d577a8"
      }
    ] as ICardsListResponse[],
  },
  {
    name: `POST with one or more selected values for enum-like attributes such as rarity`,
    url: `/${ROUTES.CARDS.CONTROLLER}/${ROUTES.CARDS.LIST}`,
    status: HttpStatus.OK,
    method: 'POST',
    params: {
      filters: {
        rarity: {
          in: ['rare', 'uncommon']
        }
      }
    },
    response: [
      {
        color: "G",
        name: "\"Ach! Hans, Run!\"",
        rarity: "rare",
        id: "ach-hans-run-a2c5ee76"
      },
      {
        color: "B",
        name: "\"Brims\" Barone, Midway Mobster",
        rarity: "uncommon",
        id: "brims-barone-midway-mobster-c64c31f2"
      },
      {
        color: "G",
        name: "A Killer Among Us",
        rarity: "uncommon",
        id: "a-killer-among-us-79d577a8"
      }
    ] as ICardsListResponse[],
  },
  {
    name: `POST Numeric comparisons (e.g., ranges) for fields like ink_cost`,
    url: `/${ROUTES.CARDS.CONTROLLER}/${ROUTES.CARDS.LIST}`,
    status: HttpStatus.OK,
    method: 'POST',
    params: {
      filters: {
        ink_cost: {
          min: 4,
          max: 5
        }
      }
    },
    response: [
      {
        name: "Ariel - On Human Legs",
        ink_cost: 4,
        rarity: "Uncommon",
        id: "ariel-on-human-legs"
      },
    ] as ICardsListResponse[],
  },
];
