import FBFunction from '../FBFunction';
import RickshawStop from '../scrappers/RickshawStop';
import { IScrapResult } from '../FBFunction/types';

export default class SecureRickshawStop extends FBFunction<IScrapResult> {
  private handler = new RickshawStop();

  protected request(): Promise<IScrapResult> {
    return this.handler.scrap();
  }
}
