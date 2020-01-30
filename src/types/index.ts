import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export interface IAuth {
  decodedIdToken: admin.auth.DecodedIdToken;
  idToken: string;
}

export interface ICorsReturn {
  req: functions.Request;
  res: functions.Response;
}

export interface IError extends Error {
  status?: number;
  authorized?: boolean;
}

export interface IConf {
  api?: string;
}

export interface IScrapResult {
  duration: number;
  status: string;
}

export interface event {
  date: Date;
  name: string;
}
