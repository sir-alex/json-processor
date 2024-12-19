import { CardsListController } from './cards-list.controller';
import { Module } from '@nestjs/common';
import { CardsListService } from './cards-list.service';

@Module({
  providers: [CardsListService],
  controllers: [CardsListController],
})
export class CardsListModule {}
