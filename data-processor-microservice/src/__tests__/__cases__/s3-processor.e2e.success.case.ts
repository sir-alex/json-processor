import path from 'path';
import fs from 'fs';

const mtgJsonFilePath = path.resolve(__dirname, '../../mocks/json', 'mtg-cards.json');
const lornacaJsonFilePath = path.resolve(__dirname, '../../mocks/json', 'lorcana-cards.json');
const mtgJsonData = JSON.parse(fs.readFileSync(mtgJsonFilePath, 'utf-8'));
const lornacaJsonData = JSON.parse(fs.readFileSync(lornacaJsonFilePath, 'utf-8'));

export interface IS3ProcessorCases {
  name: string;
  input: string;
  output: any[];
}

export const s3ProcessorSuccessCases: IS3ProcessorCases[] = [
  {
    name: 'should process single external card and save them to the database',
    input: '["https://cardnexus-hiring-docs.s3.eu-west-1.amazonaws.com/lorcana-cards.json"]',
    output: lornacaJsonData
  },
  {
    name: 'should process several external cards and save them to the database',
    input: '["https://cardnexus-hiring-docs.s3.eu-west-1.amazonaws.com/mtg-cards.json","https://cardnexus-hiring-docs.s3.eu-west-1.amazonaws.com/lorcana-cards.json"]',
    output: [
      ...mtgJsonData,
      ...lornacaJsonData
    ]
  },
];
