import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import * as request from 'supertest';

export class E2eHelper {
  protected app: INestApplication;
  private async getFixture() {
    return Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  }

  private async createNestApplication() {
    const moduleFixture: TestingModule = await this.getFixture();
    return moduleFixture.createNestApplication();
  }

  public async makePostRequest<T>(
    url: string,
    params: T,
  ) {
    const query = {
      ...(params || {}),
      ['cache-bypass']: true,
    };
    return request(this.app.getHttpServer()).post(url).send(query);
  }

  public sortByName(a: any, b: any) {
    const sortingName = Object.keys(a)[0];
    return a[sortingName].localeCompare(b.name);
  };

  public async initApp() {
    this.app = await this.createNestApplication();
    await this.app.init();
  }
}
