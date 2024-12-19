import { Test, TestingModule } from '@nestjs/testing';
import { CardsListController } from './cards-list.controller';

describe('CardsController', () => {
  let controller: CardsListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsListController],
    }).compile();

    controller = module.get<CardsListController>(CardsListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
