import { auth } from 'firebase-admin';

import { IAuth } from './types';
import { config } from '../config';

const validateFirebaseIdToken = async (
  authorization?: string
): Promise<IAuth> => {
  if (
    config.disableAuth &&
    !['production', 'test'].includes(process.env.NODE_ENV || '')
  ) {
    return {
      decodedIdToken: {} as IAuth['decodedIdToken'],
      idToken: 'FAKE_ID_TOKEN',
    };
  }

  try {
    if (!authorization || !authorization.startsWith('Bearer')) {
      throw Error('Unauthorized');
    }

    const idToken: string = authorization.split('Bearer ')[1];
    const decodedIdToken = await auth().verifyIdToken(idToken);
    const { email } = decodedIdToken;
    if (!email || !config.authorizedEmails.includes(email)) {
      throw Error('Unauthorized User');
    }

    return { decodedIdToken, idToken };
  } catch (err) {
    err.status = 403;
    err.authorized = false;
    throw err;
  }
};

export default validateFirebaseIdToken;
