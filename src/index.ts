import * as admin from 'firebase-admin';
import { https } from 'firebase-functions';

import functions from './functions';

admin.initializeApp();

// export const auth = https.onRequest(functions.auth);
// export const rickshawStop = https.onRequest(functions.rickshawStop);

export = {
  auth: https.onRequest(functions.auth),
  rickshawstop: https.onRequest(functions.rickshawStop),
};
