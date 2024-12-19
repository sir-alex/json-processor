import { Injectable } from '@nestjs/common';
import { Response } from 'express';

export interface HeadersMeta {
  total: number;
  page: number;
  pages: number;
}

@Injectable()
export class HeadersService {

  setPaginatedHeaders(res: Response, meta: HeadersMeta) {
    res.header('X-Total-Count', meta?.total.toString() || 'N/A');
    res.header('X-Page', meta?.page.toString() || 'N/A');
    res.header('X-Total-Pages', meta?.pages.toString() || 'N/A');
    return res;
  }

}
