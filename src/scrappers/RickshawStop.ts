
import { parse } from 'url';

import { load } from 'cheerio';

import Scrapper from './Scrapper';
import { Event, Venue } from './types';

const BASE_URL = 'https://www.rickshawstop.com';
export default class RickshawStop extends Scrapper<Event> {
  constructor() {
    super('RickshawStop', parse(`${BASE_URL}/calendar`));
  }

  protected extractData(data: string): Event[] {
    try {
      const $ = load(data);
      const events: Event[] = [];
      $('article.calendar-view table').each((_, t) => {
        $(t).find('td.data.has-event .one-event').each((__, d) => {
          const $d = $(d);
          if ($d.find('.sold-out').length) return;

          const $headline = $d.find('.event-name a');
          const name = $headline.text();
          events.push({
            date: new Date($d
              .parent()
              .find('.date .value-title')
              .attr('title') as string),
            description: $d
              .find('.supports a')
              .map((___, s) => $(s).text()).get().join(),
            img: $d.find('.image-url img').attr('src'),
            name,
            url: `${BASE_URL}${$headline.attr('href')}`,
            venue: Venue.RickshawStop,
          });
        });
      });

      return events;
    } catch (err) {
      const reason = Error(`failed ${this.name} extractData`);
      reason.stack += `\nCaused By:\n ${err.stack}`;
      throw reason;
    }
  }
}
