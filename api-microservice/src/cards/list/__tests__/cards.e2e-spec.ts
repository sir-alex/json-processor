import { cardsSuccessE2eCase } from './cases/cards-success.e2e-case';
import { E2eHelper } from '../../../core/tests/e2e.helper';
import { ICardsListParams, ICardsListResponse } from '../types/cards.types';

describe(`POST /cards`, () => {
  let helper: E2eHelper;

  beforeEach(async () => {
    helper = new E2eHelper();
    await helper.initApp();
  });

  cardsSuccessE2eCase.forEach((testCase) => {
    it(testCase.name, async () => {
      const { body, header } = await helper.makePostRequest<ICardsListParams>(testCase.url, testCase.params);
      const response = body as ICardsListResponse[];
      expect(response.sort(helper.sortByName)).toEqual(testCase.response.sort(helper.sortByName));
    });
  });

});
