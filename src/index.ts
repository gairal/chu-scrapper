import * as admin from 'firebase-admin';

import Auth from './functions/Auth';
import RickshawStop from './functions/RickshawStop';

admin.initializeApp();

export const auth = Auth.init();
export const reddits = RickshawStop.init();
