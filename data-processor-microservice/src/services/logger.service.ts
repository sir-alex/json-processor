import { winstonUtil } from '../utils/winston.util';

export const info = (message: string) => {
  winstonUtil.info(message);
}

export const error = (err: any, isCritical: boolean = false) => {
  winstonUtil.error(err);
  if (isCritical) {
    throw new Error(err);
  }
}

export * as loggerService from './logger.service';
