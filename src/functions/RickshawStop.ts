import FBFunction from '../FBFunction';
import RickshawStop from '../scrappers/RickshawStop';

export default class SecureRickshawStop extends FBFunction {
  private handler = new RickshawStop();

  protected request() {
    return this.handler.scrap();
  }
}
