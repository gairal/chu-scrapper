import { auth } from 'firebase-admin';
import { Request, Response } from 'firebase-functions';

export interface IAuth {
  decodedIdToken: auth.DecodedIdToken;
  idToken: string;
}

export interface ICorsReturn {
  req: Request;
  res: Response;
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
