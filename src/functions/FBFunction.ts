import * as cors from 'cors';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { ICorsReturn, IAuth } from '../types';
import { config, logger } from '../config';

const corsMiddelware = cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:8181',
    'https://events.gairal.rocks',
  ],
});

export default abstract class FBFunction {
  public static init<T extends FBFunction>(
    this: new () => T,
  ): functions.HttpsFunction {
    const fun = new this();
    return fun.init();
  }

  private static cors(
    req: functions.Request,
    res: functions.Response,
  ): Promise<ICorsReturn> {
    return new Promise((resolve) => corsMiddelware(req, res, () => resolve({ req, res })));
  }

  protected abstract request (
    auth: IAuth,
    query?: functions.Request['query'],
  ): Promise<any>;

  private async onRequest(
    { headers: { authorization } }: functions.Request,
    res: functions.Response,
  ) {
    try {
      const auth = await FBFunction.validateFirebaseIdToken(authorization);
      const data = await this.request(auth);
      res.send(data);
    } catch (err) {
      logger.error(err);

      const { status } = err;
      if (!status) throw new functions.https.HttpsError('unavailable', err);

      res.status = status;
      const { authorized, message } = err;
      res.send({
        authorized: authorized !== undefined ? authorized : true,
        message,
        status,
      });
    }
  }

  public static async validateFirebaseIdToken(
    authorization?: string,
  ): Promise<IAuth> {
    try {
      if (!authorization || !authorization.startsWith('Bearer ')) {
        throw Error('Unauthorized');
      }

      const idToken: string = authorization.split('Bearer ')[1];
      const decodedIdToken = await admin.auth().verifyIdToken(idToken);
      const { email } = decodedIdToken;
      if (!email || config.authorizedEmails.includes(email)) {
        throw Error('Unauthorized User');
      }

      return { decodedIdToken, idToken };
    } catch (err) {
      err.status = 403;
      err.authorized = false;
      throw err;
    }
  }

  /**
   * Bind the function to Firebase Functions
   *
   * @returns
   * @memberof FBFunction
   */
  public init(): functions.HttpsFunction {
    return functions.https.onRequest((req, res) => FBFunction.cors(req, res)
      .then((ret: ICorsReturn) => this.onRequest(ret.req, ret.res)));
  }
}
