import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsListController } from './cards/list/cards-list.controller';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [CardsModule],
  controllers: [AppController, CardsListController],
  providers: [AppService],
})
export class AppModule {}
