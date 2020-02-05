import axios from 'axios';

import { UrlWithStringQuery } from 'url';
import { logger } from '../config';
import { IScrapResult } from '../FBFunction/types';

export default abstract class Scrapper<T> {
  constructor(protected name: string, protected url: UrlWithStringQuery) {}

  protected static getResult(start: [number, number], overrides?: object): IScrapResult {
    const [s, ms] = process.hrtime(start);
    return {
      duration: +`${s}.${ms}`,
      status: 'ok',
      ...overrides,
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


  protected abstract extractData(data: string): T[];


  public async scrap(): Promise<IScrapResult> {
    const start = process.hrtime();
    try {
      const { data } = await axios.get(this.url.href);
      const raw = this.extractData(data);

      await this.save();
      return Scrapper.getResult(start, { count: raw.length, raw });
    } catch (err) {
      const reason = Error(`failed ${this.name} scrap`);
      reason.stack += `\nCaused By:\n ${err.stack}`;
      throw reason;
    }
  }
}
