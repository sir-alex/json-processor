import { HttpStatus } from '@nestjs/common';

export interface TestCaseE2E<T, U> {
  name: string;
  url: string;
  status?: HttpStatus;
  params: Partial<T>;
  response?: U;
  paramsError?: string[];
  query?: Record<string, string>;
  method?: 'POST' | 'GET';
  expectedCount?: number;
}


