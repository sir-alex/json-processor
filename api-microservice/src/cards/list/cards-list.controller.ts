import { Body, Controller, HttpStatus, Post, Res, UseFilters } from '@nestjs/common';
import { Response } from 'express';
import { ROUTES } from '../../core/constants/routes.constant';
import { CardsListParams } from './dto/cards-list.params.dto';
import { DbService } from '../../core/db/db.service';
import { QueryService } from '../../core/http/query.service';
import { HeadersService } from '../../core/http/headers.service';
import { ICardsListParams } from './types/cards.types';
import { HttpExceptionFilter } from '../../core/http/http-exception-filter';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { sanitizeObject } from '../../core/sanitizers/sanitizer.service';

@ApiTags('cards')
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
  @ApiOperation({ summary: 'Get a paginated list of cards' })
  @ApiResponse({ status: 200, description: 'The cards were retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid request parameters.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({ type: CardsListParams })
  async getLeaderboardGetPost(
    @Body() dto: CardsListParams,
    @Res() res: Response,
  ) {
    const sanitizedDto = sanitizeObject(dto);
    await this.handleRequest(sanitizedDto, res);
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
