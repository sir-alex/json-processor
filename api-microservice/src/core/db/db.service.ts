import { Inject, Injectable } from '@nestjs/common';
import { Collection, Db, Filter } from 'mongodb';

type FilterConditions = {
  contains?: string;
  in?: any[];
  min?: number;
  max?: number;
};

type QueryFilters = Record<string, FilterConditions | any>;

interface PaginationResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pages: number;
  };
}

@Injectable()
export class DbService {
  private collection!: Collection;

  constructor(@Inject('DATABASE_CONNECTION') private readonly db: Db) {}

  setCollection(collectionName: string) {
    this.collection = this.db.collection(collectionName);
  }

  async filterAndPaginate<T>(
    filters: Filter<any>,
    page: number,
    limit: number
  ): Promise<PaginationResult<T>> {
    this.validateFilters(filters);
    const skip = (page - 1) * limit;

    const query = this.buildQuery(filters);

    const [data, total] = await Promise.all([
      this.collection
        .find(query, { projection: { _id: 0 } })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .toArray(),
      this.collection.countDocuments(query),
    ]);

    return {
      data: data as T[],
      meta: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    };
  }

  private validateFilters(filters: QueryFilters) {
    for (const key in filters) {
      const filter = filters[key];
      if (typeof filter === 'object') {
        if (
          filter.hasOwnProperty('min') &&
          filter.hasOwnProperty('max') &&
          filter.min > filter.max
        ) {
          throw new Error(`Invalid range for ${key}: min cannot be greater than max.`);
        }
      }
    }
  }

  private buildQuery(filters: QueryFilters): Record<string, any> {
    return Object.entries(filters).reduce((query, [key, filter]) => {
      if (filter.contains) {
        query[key] = { $regex: filter.contains };
      } else if (filter.in) {
        query[key] = { $in: filter.in };
      } else if (filter.min !== undefined || filter.max !== undefined) {
        query[key] = {
          ...(filter.min !== undefined && { $gte: filter.min }),
          ...(filter.max !== undefined && { $lte: filter.max }),
        };
      } else {
        query[key] = filter;
      }
      return query;
    }, {});
  }

}
