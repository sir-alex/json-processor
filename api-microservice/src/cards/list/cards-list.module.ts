import { CardsListController } from './cards-list.controller';
import { Module } from '@nestjs/common';
import { CardsListService } from './cards-list.service';
import { DbService } from '../../core/db/db.service';
import { QueryService } from '../../core/http/query.service';
import { HeadersService } from '../../core/http/headers.service';

@Module({
  providers: [
    DbService,
    QueryService,
    HeadersService,
    CardsListService
  ],
  controllers: [CardsListController],
})
export class CardsListModule {}
