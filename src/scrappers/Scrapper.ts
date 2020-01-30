import { logger } from '../config';
import { IScrapResult } from '../types';

export default abstract class Scrapper {
  constructor(protected name: string) {}

  public abstract scrap(): Promise<IScrapResult>;

  protected static getResult(start: [number, number], status = 'ok'): IScrapResult {
    const [s, ms] = process.hrtime(start);
    return {
      duration: +`${s}.${ms}`,
      status,
    };
  }

  protected async save(): Promise<void> {
    try {
      logger.info('will save');
    } catch (err) {
      const reason = Error(`failed ${this.name} request`);
      reason.stack += `\nCaused By:\n ${err.stack}`;
      throw reason;
    }
  }
}
