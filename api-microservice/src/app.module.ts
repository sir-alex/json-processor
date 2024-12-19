import { Module } from '@nestjs/common';
import { CardsListController } from './cards/list/cards-list.controller';
import { CardsModule } from './cards/cards.module';
import { DbService } from './core/db/db.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CardsListModule } from './cards/list/cards-list.module';
import { QueryService } from './core/http/query.service';
import { HeadersService } from './core/http/headers.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    CardsModule,
    CardsListModule
  ],
  controllers: [CardsListController],
  providers: [DbService, QueryService, HeadersService],
})
export class AppModule {}
