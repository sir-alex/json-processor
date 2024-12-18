import { MongoMemoryServer } from 'mongodb-memory-server';
import { Collection, Db, MongoClient } from 'mongodb';
import { http, HttpResponse } from 'msw';

import { server } from '../mocks/server'
import { App } from '../App';
import { ICONFIG } from '../config';
import { s3ProcessorSuccessCases } from './__cases__/s3-processor.e2e.success.case';
import { s3ProcessorErrorCases } from './__cases__/s3-processor.e2e.error.case';

const sortByName = (a: any, b: any) => a.name.localeCompare(b.name);

describe('App Test Suite', () => {
  let mongoServer: MongoMemoryServer;
  let client: MongoClient;
  let db: Db;
  let collection: Collection;
  let config: ICONFIG

  beforeAll(async () => {
    server.listen();
    mongoServer = await MongoMemoryServer.create();
    const uri: string = mongoServer.getUri();

    client = new MongoClient(uri);
    await client.connect();
    db = client.db('cardnexus-test');
    collection = db.collection('tcg-cards-polymorphic')

    config = {
      EXTERNAL_CARDS: '[]',
      MONGO_URL: uri + 'cardnexus-test',
      JSON_BUFFER_SIZE: 500,
      MIN_POOL_SIZE: 5,
      MAX_POOL_SIZE: 90,
      ENV_NAME: 'jest'
    }
  });

  afterAll(async () => {
    await client.close();
    await mongoServer.stop();
    server.close();
  });

  afterEach(async () => {
    server.resetHandlers();
    await collection.drop();
  })

  s3ProcessorSuccessCases.forEach((testCase) => {
    test(testCase.name, async () => {
      const app = new App({
        ...config,
        EXTERNAL_CARDS: testCase.input,
      });
      await app.run();
      const result = await collection.find({}, { projection: { _id: 0 } }).toArray();
      expect(result.length).toBe(testCase.output.length);
      expect(result.sort(sortByName)).toEqual(testCase.output.sort(sortByName));
    });
  });

  s3ProcessorErrorCases.forEach((testCase) => {
    test(`${JSON.parse(testCase.input)[0]}: ${testCase.name}`, async () => {
      server.use(
        http.get(JSON.parse(testCase.input)[0], () => {
          return HttpResponse.json(testCase.data);
        }),
      );
      const app = new App({
        ...config,
        EXTERNAL_CARDS: testCase.input,
      });
      await app.run();
      const result = await collection.find({}, { projection: { _id: 0 } }).toArray();
      expect(result.length).toBe(0);
    });
  });

});
