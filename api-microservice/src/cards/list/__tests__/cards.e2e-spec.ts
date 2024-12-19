import { cardsSuccessE2eCase } from './cases/cards-success.e2e-case';
import { E2eHelper } from '../../../core/tests/e2e.helper';
import { ICardsListParams, ICardsListResponse } from '../types/cards.types';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import { cardsErrorE2eCase } from './cases/cards-error.e2e-case';
const lorcanaCards = require('./mocks/lorcana-cards.json');
const mtgCards = require('./mocks/mtg-cards.json');

describe(`POST /cards`, () => {
  let helper: E2eHelper;
  let mongoServer: MongoMemoryServer;
  let client: MongoClient;

  /*TODO: move it to helper*/
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri() + 'cardnexus-test';
    process.env.MONGO_URI = uri;
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db();
    const collection = db.collection('tcg-cards-polymorphic');
    await collection.insertMany([...lorcanaCards, ...mtgCards]);
  });

  afterAll(async () => {
    await client.close();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    helper = new E2eHelper();
    await helper.initApp();
  });

  describe('Success cases', () => {
    cardsSuccessE2eCase.forEach((testCase) => {
      it(testCase.name, async () => {
        const { body, header, status } = await helper.makePostRequest<ICardsListParams>(testCase.url, testCase.params);
        const response = body as ICardsListResponse[];
        expect(status).toBe(testCase.status);
        expect(response.sort(helper.sortByName)).toEqual(testCase.response.sort(helper.sortByName));
      });
    });
  })

  describe('Error cases', () => {
    cardsErrorE2eCase.forEach((testCase) => {
      it(testCase.name, async () => {
        const { body, header, status } = await helper.makePostRequest<ICardsListParams>(testCase.url, testCase.params);
        const response = body as ICardsListResponse[];
        expect(status).toBe(testCase.status);
        expect(Array.isArray(response)).toBe(false);
      });
    });
  });
});
