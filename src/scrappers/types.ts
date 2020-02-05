export enum Venue {
  RickshawStop = 'RickshawStop',
  Roxy = 'Roxy',
  TheIndependent = 'TheIndependent',
}

export interface Event {
  date: Date;
  description?: string;
  img?: string;
  name: string;
  venue: Venue;
  url: string;
}
