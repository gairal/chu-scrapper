import * as functions from 'firebase-functions';

import { IAuth, IError } from './types';
import { logger } from '../config';
import validateFirebaseIdToken from './auth';
import cors from './cors';

const catcher = (res: functions.Response) => (err: IError) => {
  logger.error(err);

  const { status } = err;
  if (!status) throw new functions.https.HttpsError('unavailable', err.message);

  const { authorized, message } = err;
  res.send({
    authorized: authorized !== undefined ? authorized : true,
    message,
    status,
  });
};

export default abstract class FBFunction<T = void> {
  protected abstract request(
    auth: IAuth | null,
    query?: functions.Request['query']
  ): Promise<T>;

  public async onRequest(
    req: functions.Request,
    res: functions.Response
  ): Promise<void> {
    try {
      // check CORS
      await cors(req, res);
      // check Authentication
      const auth = await validateFirebaseIdToken(req.headers.authorization);
      // execute function
      const data = await this.request(auth);
      res.type('application/json').send(data);
    } catch (err) {
      catcher(res)(err);
    }
  }
}
