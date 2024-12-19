import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient, Db } from 'mongodb';
import { DbService } from '../core/db/db.service';

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (configService: ConfigService): Promise<Db> => {
        const uri = configService.get<string>('MONGO_URI');
        const client = new MongoClient(uri);
        await client.connect();
        return client.db();
      },
      inject: [ConfigService],
    },
    DbService,
  ],
  exports: ['DATABASE_CONNECTION', DbService],
})
export class DatabaseModule {}
