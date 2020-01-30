
import { parse } from 'url';

import { load } from 'cheerio';

import Scrapper from './Scrapper';

interface ExtractedData{
  name: string
  weeks: { name: string, events: any[] }[][]
}

export default class RickshawStop extends Scrapper<ExtractedData> {
  constructor() {
    super('RickshawStop', parse('https://www.rickshawstop.com/calendar/'));
  }

  protected extractData(data: string): ExtractedData[] {
    try {
      const $ = load(data);
      const months = $('article.calendar-view table').map((_, t) => {
        const $t = $(t);
        return {
          name: $t.find('h3.month').text(),
          days: $t.find('td.data').map((___, d) => d.attribs.class).get(),
        };
      }).get();

      return months;
    } catch (err) {
      const reason = Error(`failed ${this.name} extractData`);
      reason.stack += `\nCaused By:\n ${err.stack}`;
      throw reason;
    }
  }
}
