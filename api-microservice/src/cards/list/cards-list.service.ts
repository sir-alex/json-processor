import { Injectable } from '@nestjs/common';

@Injectable()
export class CardsListService {
  getHello(): string {
    return 'Hello World!';
  }
}
