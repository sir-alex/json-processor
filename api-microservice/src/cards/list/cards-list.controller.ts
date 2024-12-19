import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ROUTES } from '../../core/constants/routes.constant';
import { CardsListParams } from './dto/cards-list.params.dto';

@Controller(ROUTES.CARDS.CONTROLLER)
export class CardsListController {

  @Post(ROUTES.CARDS.LIST)
  async getLeaderboardGetPost(
    @Body() dto: CardsListParams,
    @Res() res: Response,
  ) {
    await this.handleRequest(dto, res);
  }

  private async handleRequest(
    dto: CardsListParams,
    res: Response,
  ) {
    return res.status(HttpStatus.OK).json([
      {
        "name": "Maximus - Relentless Pursuer",
        "ink_cost": 3,
        "rarity": "Uncommon",
        "id": "maximus-relentless-pursuer"
      }
    ]);
  }

}
