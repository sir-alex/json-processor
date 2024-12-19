import { Body, Controller, HttpStatus, Post, Res, UseFilters } from '@nestjs/common';
import { Response } from 'express';
import { ROUTES } from '../../core/constants/routes.constant';
import { CardsListParams } from './dto/cards-list.params.dto';
import { DbService } from '../../core/db/db.service';
import { QueryService } from '../../core/http/query.service';
import { HeadersService } from '../../core/http/headers.service';
import { ICardsListParams } from './types/cards.types';
import { HttpExceptionFilter } from '../../core/http/http-exception-filter';

@Controller(ROUTES.CARDS.CONTROLLER)
@UseFilters(HttpExceptionFilter)
export class CardsListController {

  constructor(
    private readonly queryService: QueryService,
    private readonly headersService: HeadersService,
    private readonly dbService: DbService,
  ) {
    this.dbService.setCollection('tcg-cards-polymorphic');
  }

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
      const { filters, page, limit, fields } = this.queryService.getPaginatedQueryParams(dto);
      const { data, meta } = await this.dbService.filterAndPaginate<ICardsListParams>(
        filters,
        page,
        limit,
        fields,
      );
      res = this.headersService.setPaginatedHeaders(res, meta);
      return res.status(HttpStatus.OK).json(data);
  }

}
