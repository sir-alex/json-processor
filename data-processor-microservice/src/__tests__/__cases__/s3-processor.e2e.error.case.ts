export interface IS3ProcessorErrorCases {
  name: string;
  input: string;
  data: any[];
}

export const s3ProcessorErrorCases: IS3ProcessorErrorCases[] = [
  {
    name: 'In case of wrong rarity data, should not save the card to the database',
    input: '["https://cardnexus-hiring-docs.s3.eu-west-1.amazonaws.com/lorcana-cards.json"]',
    data: [
      {
        "name": "Ariel - On Human Legs",
        "ink_cost": 4,
        "rarity": "AAAAA", // wrong data
        "id": "ariel-on-human-legs"
      },
    ],
  },
  {
    name: 'In case of wrong rarity data, should not save the card to the database',
    input: '["https://cardnexus-hiring-docs.s3.eu-west-1.amazonaws.com/mtg-cards.json"]',
    data: [
      {
        "name": "Ariel - On Human Legs",
        "ink_cost": 4,
        "color": "AAAAA", // wrong data
        "id": "ariel-on-human-legs"
      },
    ],
  },
  {
    name: 'In case of wrong param name, should not save the card to the database',
    input: '["https://cardnexus-hiring-docs.s3.eu-west-1.amazonaws.com/lorcana-cards.json"]',
    data: [
      {
        "name": "Ariel - On Human Legs",
        "ink_cost": 4,
        "rarityyyyyyy": "Common", // wrong param name
        "id": "ariel-on-human-legs"
      },
    ],
  },
];
