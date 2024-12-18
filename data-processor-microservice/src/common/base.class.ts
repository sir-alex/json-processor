export class BaseClass {
  protected checkEnvParams(obligatoryParams: any[]) {
    if (obligatoryParams.some((param) => !param)) {
      throw new Error('Obligatory params were not provided');
    }
  }
}
