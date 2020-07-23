import { Request, Response } from 'firebase-functions';

import { mockReq, mockRes } from '../../../__mocks__/reqRes';
import Auth from '../../functions/Auth';

describe('FB/Auth', () => {
  let func: Auth;
  let req: Request;
  let res: Response;
  beforeEach(() => {
    func = new Auth();
    req = mockReq({ headers: { authorization: 'Bearer NAH' } });
    res = mockRes();
  });

  describe('onRequest', () => {
    it('expects to send a positive response if the user is legit', async () => {
      await func.onRequest(req, res);
      expect(res.send).toHaveBeenCalledWith({
        authorized: true,
        name: 'Al Good',
        status: 200,
      });
    });
  });
});
