import FBFunction from './FBFunction';
import { IAuth } from '../types';

export default class Auth extends FBFunction {
  // eslint-disable-next-line class-methods-use-this
  public async request(auth: IAuth) {
    const { name } = auth.decodedIdToken;
    if (!name) {
      throw Error('Auth Failed');
    }

    return {
      name,
      authorized: true,
      status: 200,
    };
  }
}
