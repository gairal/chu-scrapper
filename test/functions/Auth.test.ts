import { Request, Response } from 'firebase-functions';

import funcs from '../../src/functions';
import { mockReq, mockRes } from '../mocks/reqRes';

describe('FB/Auth', () => {
  let func: (req: Request, res: Response<any>) => Promise<void>;
  let req: Request;
  let res: Response;
  beforeEach(() => {
    func = funcs.auth;
    req = mockReq({ headers: { authorization: 'Bearer NAH' } });
    res = mockRes();
  });

  describe('onRequest', () => {
    it('expects to send a positive response if the user is legit', async () => {
      await func(req, res);
      expect(res.send).toHaveBeenCalledWith({
        authorized: true,
        name: 'Al Good',
        status: 200,
      });
    });
  });
});
