import { Module } from '@nestjs/common';
import { CardsListModule } from './list/cards-list.module';

@Module({
  imports: [
    CardsListModule
  ],
})
export class CardsModule {}
