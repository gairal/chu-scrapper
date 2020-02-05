import axios from 'axios';

import { UrlWithStringQuery } from 'url';
import { logger } from '../config';
import { IScrapResult } from '../FBFunction/types';
import { Event } from './types';

export default abstract class Scrapper {
  constructor(protected name: string, protected url: UrlWithStringQuery) {}

  protected static getResult(start: [number, number], overrides?: object): IScrapResult {
    const [s, ms] = process.hrtime(start);
    return {
      duration: +`${s}.${ms}`,
      status: 'ok',
      ...overrides,
    };
  }

  protected async save(events: Event[]): Promise<void> {
    try {
      logger.info('will save', events);
    } catch (err) {
      const reason = Error(`failed ${this.name} request`);
      reason.stack += `\nCaused By:\n ${err.stack}`;
      throw reason;
    }
  }

  protected abstract extractData(data: string): Event[];

  public async scrap(): Promise<IScrapResult> {
    const start = process.hrtime();
    try {
      const { data } = await axios.get(this.url.href);
      const events = this.extractData(data);

      await this.save(events);
      return Scrapper.getResult(start, { count: events.length, events });
    } catch (err) {
      const reason = Error(`failed ${this.name} scrap`);
      reason.stack += `\nCaused By:\n ${err.stack}`;
      throw reason;
    }
  }
}
