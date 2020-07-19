import * as cors from 'cors';
import { Request, Response } from 'firebase-functions';

import { ICorsReturn } from './types';

const corsMiddleware = cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:8181',
    'https://events.gairal.rocks',
  ],
});

const corsCheck = (req: Request, res: Response): Promise<ICorsReturn> =>
  new Promise((resolve) => {
    corsMiddleware(req, res, () => resolve({ req, res }));
  });

export default corsCheck;
