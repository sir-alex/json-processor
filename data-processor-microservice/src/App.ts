import { Collection, Db, MongoClient } from 'mongodb';
import { bufferCount, map, mergeMap } from 'rxjs';
import pLimit from 'p-limit';
import { ValidationResult } from 'joi';
import { loggerService } from './services/logger.service';
import { s3UrlParserService } from './services/s3-url-parser.service';
import { S3Uploader } from './tcg/s3-uploader';
import { MtgCardsType } from './types/cards/mtg-cards.types';
import { LorcanaCardsType } from './types/cards/lorcana-cards.types';
import { getValidationSchema } from './schemas/map.schema';
import { BaseClass } from './common/base.class';

import { CONFIG, ICONFIG } from './config';

type CardTypesUnion = MtgCardsType | LorcanaCardsType;

export class App extends BaseClass {

  protected config: ICONFIG;
  private db: Db | undefined;
  private collection: Collection | undefined;

  constructor(config: ICONFIG) {
    super();
    this.checkEnvParams([config.EXTERNAL_CARDS.length])
    this.config = config;
  }

  public async run() {
    try {
      this.db = await this.connectToDb();
      this.collection = this.db.collection('tcg-cards-polymorphic');
      loggerService.info('Connected successfully to MongoDB');
      await Promise.all([
        this.processExtCards(JSON.parse(this.config.EXTERNAL_CARDS)),
        this.saveDataLake()
      ]);
      await this.createIndexes();
      if (this.config.ENV_NAME !== 'jest') process.exit(0);
    } catch (e) {
      loggerService.error(e);
    }
  }

  private async connectToDb(): Promise<Db> {
    return new Promise(async (resolve, reject) => {
      try {
        const url = this.config.MONGO_URL;
        const client = new MongoClient(url, {
          minPoolSize: CONFIG.MIN_POOL_SIZE,
          maxPoolSize: CONFIG.MAX_POOL_SIZE,
        });
        await client.connect();
        resolve(client.db());
      } catch (error) {
        const errTxt = `Failed to connect to MongoDB. Error: ${error?.toString() || 'N/A'}`;
        reject(errTxt);
      }
    });
  }

  private async processExtCards(extCards: string[]) {
    // Limit the number of concurrent requests to 5
    const limit= pLimit(5);
    return Promise.all(extCards.map((externalCardUrl) =>
      limit(() => {
        loggerService.info(`Processing ${externalCardUrl || 'N/A'}...`);
        return this.processOneCard(externalCardUrl);
      })
    ));
  }

  private async processOneCard(externalCardUrl: string): Promise<null> {
    return new Promise(async (resolve, reject) => {
      const { region, bucket, key, fileName } = s3UrlParserService.getS3UrlParts(externalCardUrl);
      let recordsProcessed = 0;
      const s3Uploader = new S3Uploader(region, bucket, key);
      const s3ProcessorObservable$ = await s3Uploader.process<CardTypesUnion>();
      s3ProcessorObservable$
        .pipe(
          bufferCount(CONFIG.JSON_BUFFER_SIZE),
          map((batch) => ({ batch, size: batch.length })),
          mergeMap(async ({ batch }) => {
            const validationResult = this.isBatchValid(fileName, batch);
            if (validationResult?.error) {
              throw new Error(validationResult.error.message);
            }
            await this.saveBatch(batch);
            loggerService.info(`${fileName}: Inserted batch of ${batch.length} records`);
            recordsProcessed += batch.length;
          })
        )
        .subscribe({
          complete: () => {
            loggerService.info(`Finished processing ${externalCardUrl || 'N/A'}. Records processed: ${recordsProcessed}`)
            resolve(null);
          },
          error: (err) => {
            loggerService.error(err);
            reject(err);
          },
        });
    })
  }

  private isBatchValid(filename: string, batch: CardTypesUnion[]): ValidationResult<CardTypesUnion> | undefined {
    const schemaArr = getValidationSchema(filename);
    return schemaArr?.validate(batch) || undefined;
  }

  private saveBatch(batch: CardTypesUnion[]) {
    return this.collection?.bulkWrite(batch.map((record) => ({
      updateOne: {
        filter: { id: record.id },
        update: { $set: record },
        upsert: true,
        new: true,
      },
    })));
  }

  private async createIndexes() {
    if (this.collection) {
      await this.collection.createIndex({ id: 1 }, { unique: true });
      await this.collection.createIndex({ name: 1 });
      await this.collection.createIndex({ rarity: 1 });
      await this.collection.createIndex({ color: 1 });
      await this.collection.createIndex({ ink_cost: 1 });
      await this.collection.createIndex({ name: 1, rarity: 1, ink_cost: 1 });
      await this.collection.createIndex({ name: 1, rarity: 1, color: 1 });
      loggerService.info('Indexes created successfully');
    }
  }

  private async saveDataLake() {
    /*TODO: add functionality to save external S3 in own S3 (with versioning) to have own data lake and be able use data in OLAP (AWS Athena etc) */
    loggerService.info('Saving data to Data Lake...');
  }

}
