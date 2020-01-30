import FBFunction from './FBFunction';
import RickshawStop from '../scrappers/RickshawStop';

export default class SecureRickshawStop extends FBFunction {
  private handler = new RickshawStop();

  public request() {
    return this.handler.scrap();
  }
}
