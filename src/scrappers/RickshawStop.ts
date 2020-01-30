
import axios from 'axios';

import { logger } from '../config';
import Scrapper from './Scrapper';
import { IScrapResult } from '../types';

export default class RickshawStop extends Scrapper {
  constructor() {
    super('RickshawStop');
  }

  public async scrap(): Promise<IScrapResult> {
    const start = process.hrtime();
    try {
      const dom = await axios.get('https://www.rickshawstop.com/calendar/');
      await this.save();
      return Scrapper.getResult(start);
    } catch (err) {
      const reason = Error(`failed ${this.name} request`);
      reason.stack += `\nCaused By:\n ${err.stack}`;
      throw reason;
    }
  }
}
