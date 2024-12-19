import { Injectable } from '@nestjs/common';
import { PaginatedRequest } from '../type/requests.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QueryService {

  constructor(private readonly configService: ConfigService) {}

  getPaginatedQueryParams<T extends object>(dto: PaginatedRequest<T>) {
    const defaultLimit = Number(this.configService.get<number>('DEFAULT_RESPONSE_LIMIT'));
    return {
      page: dto?.page || 1,
      limit: dto?.limit || defaultLimit,
      filters: dto?.filters || {},
    };
  }

}
