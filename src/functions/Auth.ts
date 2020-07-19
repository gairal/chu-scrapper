import FBFunction from '../FBFunction';
import { IAuth } from '../FBFunction/types';

type Result = {
  name: string;
  authorized: boolean;
  status: number;
};

export default class Auth extends FBFunction<Result> {
  // eslint-disable-next-line class-methods-use-this
  public async request(auth: IAuth): Promise<Result> {
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
